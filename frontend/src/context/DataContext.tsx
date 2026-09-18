import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { portfolioImages as initialPortfolioImages } from '../data';

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
  images: PortfolioImageItem[];
}

interface DataContextType {
  categories: Category[];
  portfolioImages: PortfolioImage[];
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  addCategory: (category: Category) => void;
  addAlbum: (albumData: { alt: string, category: string, images: string[] }) => Promise<void>;
  editAlbum: (id: string | number, albumData: { alt: string, category: string, images: string[] }) => Promise<void>;
  deleteAlbum: (id: string | number) => Promise<void>;
}

const initialCategories: Category[] = [
  { id: "all", label: "All" },
  { id: "portrait", label: "Portrait" },
  { id: "landscape", label: "Landscape" },
  { id: "wildlife", label: "Wildlife" },
  { id: "street", label: "Street" },
  { id: "astro", label: "Astro" },
  { id: "event", label: "Event" },
  { id: "architectural", label: "Architectural" },
  { id: "birthday", label: "Birthday" }
];

const DataContext = createContext<DataContextType | undefined>(undefined);
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('mockCategories');
    return saved ? JSON.parse(saved) : initialCategories;
  });

  const [portfolioImages, setPortfolioImages] = useState<PortfolioImage[]>(initialPortfolioImages);
  
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('adminToken'));
  const isAuthenticated = !!token;

  // Fetch albums from backend
  const fetchAlbums = async () => {
    try {
      const res = await axios.get(`${API_URL}/albums`);
      if (res.data && res.data.length > 0) {
        setPortfolioImages(res.data);
      } else {
        // Fallback to static data if backend is empty for demo purposes
        setPortfolioImages(initialPortfolioImages);
      }
    } catch (err) {
      console.error("Failed to fetch albums", err);
      setPortfolioImages(initialPortfolioImages);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  useEffect(() => {
    localStorage.setItem('mockCategories', JSON.stringify(categories));
  }, [categories]);

  // Actions
  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem('adminToken', newToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('adminToken');
  };

  const addCategory = (category: Category) => {
    setCategories(prev => [...prev, category]);
  };

  const addAlbum = async (albumData: { alt: string, category: string, images: string[] }) => {
    try {
      const res = await axios.post(`${API_URL}/albums`, albumData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPortfolioImages(prev => [res.data, ...prev]);
    } catch (err) {
      console.error("Failed to add album", err);
      throw err;
    }
  };

  const editAlbum = async (id: string | number, albumData: { alt: string, category: string, images: string[] }) => {
    try {
      const res = await axios.put(`${API_URL}/albums/${id}`, albumData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPortfolioImages(prev => prev.map(album => String(album.id) === String(id) ? res.data : album));
    } catch (err) {
      console.error("Failed to edit album", err);
      throw err;
    }
  };

  const deleteAlbum = async (id: string | number) => {
    try {
      await axios.delete(`${API_URL}/albums/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
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
      token,
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
