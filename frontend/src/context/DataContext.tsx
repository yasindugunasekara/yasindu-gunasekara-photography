import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Configure Axios globally
axios.defaults.withCredentials = true;

// Add a response interceptor to handle token refresh
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Prevent infinite loop if the refresh or login request itself fails with 401
    if (originalRequest.url.includes('/refresh') || originalRequest.url.includes('/login')) {
      return Promise.reject(error);
    }

    // If the error status is 401/403 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it.
    if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await axios.post(`${API_URL}/refresh`);
        // Retry the original request with the new access token cookie
        return axios(originalRequest);
      } catch (refreshError) {
        // Refresh token is expired or invalid
        localStorage.removeItem('isAdminLoggedIn');
        window.location.href = '/admin/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
// --- Types ---
export interface Category {
  id: string;
  label: string;
}

export interface PortfolioImageItem {
  id: number;
  src: string;
}

export interface PortfolioImage {
  id: string | number;
  alt: string;
  category: string;
  coverImage?: string;
  images: { id: number; src: string }[];
}

interface DataContextType {
  categories: Category[];
  portfolioImages: PortfolioImage[];
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  addCategory: (category: Category) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  addAlbum: (albumData: { alt: string, category: string, coverImage?: string, images: string[] }) => Promise<void>;
  editAlbum: (id: string | number, albumData: { alt: string, category: string, coverImage?: string, images: string[] }) => Promise<void>;
  deleteAlbum: (id: string | number) => Promise<void>;
}

const initialCategories: Category[] = [];

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [portfolioImages, setPortfolioImages] = useState<PortfolioImage[]>([]);
  
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => localStorage.getItem('isAdminLoggedIn') === 'true');

  // Fetch albums from backend
  const fetchAlbums = async () => {
    try {
      const res = await axios.get(`${API_URL}/albums`);
      // Use raw db objects directly, we don't map to `initialPortfolioImages` fallback anymore
      setPortfolioImages(res.data || []);
    } catch (err) {
      console.error("Failed to fetch albums", err);
      setPortfolioImages([]);
    }
  };

  // Fetch categories from backend
  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_URL}/categories`);
      if (res.data && res.data.length > 0) {
        setCategories(res.data);
      } else {
        setCategories([{ id: "all", label: "All" }]);
      }
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  useEffect(() => {
    fetchAlbums();
    fetchCategories();
  }, []);

  // Actions
  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAdminLoggedIn', 'true');
  };

  const logout = async () => {
    try {
      await axios.post(`${API_URL}/logout`);
    } catch (err) {
      console.error("Logout error", err);
    }
    setIsAuthenticated(false);
    localStorage.removeItem('isAdminLoggedIn');
  };

  const addCategory = async (category: Category) => {
    try {
      const res = await axios.post(`${API_URL}/categories`, category);
      setCategories(prev => [...prev, res.data]);
    } catch (err) {
      console.error("Failed to add category", err);
      throw err;
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/categories/${id}`);
      setCategories(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      console.error("Failed to delete category", err);
      throw err;
    }
  };

  const addAlbum = async (albumData: { alt: string, category: string, coverImage?: string, images: string[] }) => {
    try {
      const res = await axios.post(`${API_URL}/albums`, albumData);
      setPortfolioImages(prev => [res.data, ...prev]);
    } catch (err) {
      console.error("Failed to add album", err);
      throw err;
    }
  };

  const editAlbum = async (id: string | number, albumData: { alt: string, category: string, coverImage?: string, images: string[] }) => {
    try {
      const res = await axios.put(`${API_URL}/albums/${id}`, albumData);
      setPortfolioImages(prev => prev.map(album => String(album.id) === String(id) ? res.data : album));
    } catch (err) {
      console.error("Failed to edit album", err);
      throw err;
    }
  };

  const deleteAlbum = async (id: string | number) => {
    try {
      await axios.delete(`${API_URL}/albums/${id}`);
      setPortfolioImages(prev => prev.filter(album => String(album.id) !== String(id)));
    } catch (err) {
      console.error("Failed to delete album", err);
      throw err;
    }
  };

  return (
    <DataContext.Provider value={{
      categories,
      portfolioImages,
      isAuthenticated,
      login,
      logout,
      addCategory,
      addAlbum,
      editAlbum,
      deleteAlbum
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
