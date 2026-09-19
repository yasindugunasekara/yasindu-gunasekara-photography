import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData, PortfolioImage, PortfolioImageItem, Category } from '../../context/DataContext';
import { LogOut, Plus, Trash2, Edit2, Image as ImageIcon, Tag, Save, X, UploadCloud, Settings, Menu, ArrowLeft, Star } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const getOptimizedUrl = (url: string, width: number = 200, height: number = 200) => {
  if (!url || !url.includes('res.cloudinary.com')) return url;
  if (url.includes('/upload/c_')) return url; // Already optimized
  const parts = url.split('/upload/');
  if (parts.length === 2) {
    return `${parts[0]}/upload/c_fill,w_${width},h_${height},f_auto,q_auto/${parts[1]}`;
  }
  return url;
};

const AdminDashboard: React.FC = () => {
  const { 
    categories, 
    portfolioImages, 
    isAuthenticated,
    logout, 
    addCategory, 
    deleteCategory, 
    addAlbum, 
    editAlbum, 
    deleteAlbum 
  } = useData();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'albums' | 'addAlbum' | 'categories' | 'settings'>(() => {
    return (sessionStorage.getItem('adminActiveTab') as any) || 'albums';
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  React.useEffect(() => {
    sessionStorage.setItem('adminActiveTab', activeTab);
  }, [activeTab]);

  // Add/Edit Album State
  const [isEditing, setIsEditing] = useState<string | number | null>(null);
  const [albumTitle, setAlbumTitle] = useState('');
  const [albumCategory, setAlbumCategory] = useState('');
  
  // Images already uploaded to Cloudinary
  const [existingImages, setExistingImages] = useState<string[]>([]);
  
  // New images to upload
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [coverImage, setCoverImage] = useState<string>('');
  const [deleteModal, setDeleteModal] = useState<{ type: 'album' | 'category' | null, id: string | number | null, name: string }>({ type: null, id: null, name: '' });
  
  const [isUploading, setIsUploading] = useState(false);

  // Add Category State
  const [newCategoryLabel, setNewCategoryLabel] = useState('');
  const [newCategoryId, setNewCategoryId] = useState('');

  // Password Change State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMsg, setPasswordMsg] = useState({ type: '', text: '' });
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadedFiles(prev => [...prev, ...acceptedFiles]);
    const newPreviews = acceptedFiles.map(file => URL.createObjectURL(file));
    setPreviewUrls(prev => [...prev, ...newPreviews]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: {'image/*': ['.jpeg', '.jpg', '.png', '.webp']} });

  const removePreview = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };
  
  const removeExistingPreview = (index: number) => {
    setExistingImages(prev => prev.filter((_, i) => i !== index));
  };

  const startEditAlbum = (album: PortfolioImage) => {
    setIsEditing(album.id);
    setAlbumTitle(album.alt);
    setAlbumCategory(album.category);
    setExistingImages(album.images.map(img => img.src));
    setCoverImage(album.coverImage || (album.images.length > 0 ? album.images[0].src : ''));
    setUploadedFiles([]);
    setPreviewUrls([]);
    setActiveTab('addAlbum');
  };

  const handleSaveAlbum = async () => {
    if (!albumTitle || !albumCategory || (uploadedFiles.length === 0 && existingImages.length === 0)) {
      alert('Please fill all fields and ensure the album has at least one image');
      return;
    }

    setIsUploading(true);
    try {
      // 1. Upload NEW Images
      let cloudinaryUrls: string[] = [];
      if (uploadedFiles.length > 0) {
        const formData = new FormData();
        uploadedFiles.forEach(file => formData.append('images', file));

        const uploadRes = await axios.post(`${import.meta.env.VITE_API_URL}/upload`, formData, {
          withCredentials: true
        });
        cloudinaryUrls = uploadRes.data.urls;
      }

      const finalImages = [...existingImages, ...cloudinaryUrls];

      let finalCoverImage = coverImage;
      // If the selected cover is a newly uploaded image, replace local preview URL with Cloudinary URL
      const newUploadIndex = previewUrls.indexOf(coverImage);
      if (newUploadIndex !== -1 && cloudinaryUrls[newUploadIndex]) {
        finalCoverImage = cloudinaryUrls[newUploadIndex];
      }
      
      // Fallback: if no cover is explicitly set, use the first image
      if (!finalCoverImage && finalImages.length > 0) {
        finalCoverImage = finalImages[0];
      }

      // 2. Save or Update Album
      if (isEditing) {
        await editAlbum(isEditing, {
          alt: albumTitle,
          category: albumCategory,
          coverImage: finalCoverImage,
          images: finalImages
        });
      } else {
        await addAlbum({
          alt: albumTitle,
          category: albumCategory,
          coverImage: finalCoverImage,
          images: finalImages
        });
      }

      // Reset
      setAlbumTitle('');
      setAlbumCategory('');
      setExistingImages([]);
      setCoverImage('');
      setUploadedFiles([]);
      setPreviewUrls([]);
      setIsEditing(null);
      setActiveTab('albums');
      
    } catch (err: any) {
      console.error(err);
      const errorMessage = err.response?.data?.error || err.message || 'Unknown error occurred';
      alert(`Failed to save album: ${errorMessage}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategoryLabel || !newCategoryId) {
      alert('Please fill all fields');
      return;
    }
    try {
      await addCategory({ id: newCategoryId.toLowerCase(), label: newCategoryLabel });
      setNewCategoryLabel('');
      setNewCategoryId('');
      alert('Category added successfully!');
    } catch (err) {
      alert('Failed to add category. It may already exist.');
    }
  };

  const handleDeleteCategory = (id: string, name: string) => {
    setDeleteModal({ type: 'category', id, name });
  };

  const handleDeleteAlbum = (id: string | number, name: string) => {
    setDeleteModal({ type: 'album', id, name });
  };

  const executeDelete = async () => {
    if (!deleteModal.type || !deleteModal.id) return;
    try {
      if (deleteModal.type === 'category') {
        await deleteCategory(deleteModal.id as string);
      } else {
        await deleteAlbum(deleteModal.id);
      }
      setDeleteModal({ type: null, id: null, name: '' });
    } catch (err) {
      alert(`Failed to delete ${deleteModal.type}`);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMsg({ type: '', text: '' });

    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: 'error', text: 'New passwords do not match.' });
      return;
    }

    if (newPassword.length < 6) {
      setPasswordMsg({ type: 'error', text: 'New password must be at least 6 characters.' });
      return;
    }

    setIsUpdatingPassword(true);
    try {
      const res = await axios.put(`${import.meta.env.VITE_API_URL}/admin/password`, 
        { currentPassword, newPassword }
      );
      setPasswordMsg({ type: 'success', text: res.data.message });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setPasswordMsg({ type: 'error', text: err.response?.data?.error || 'Failed to update password' });
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0 bg-white shadow-lg hidden md:flex flex-col h-full">
        <div className="flex-1 flex flex-col">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>Admin Panel</h2>
            <p className="text-sm text-gray-500 mt-1">Yasindu Photography</p>
          </div>
          
          <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto" data-lenis-prevent>
            <button
              onClick={() => setActiveTab('albums')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'albums' ? 'bg-amber-50 text-amber-600' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <ImageIcon className="h-5 w-5" />
              <span className="font-medium">Manage Albums</span>
            </button>
            <button
              onClick={() => { setActiveTab('addAlbum'); setIsEditing(null); setAlbumTitle(''); setAlbumCategory(''); setExistingImages([]); setUploadedFiles([]); setPreviewUrls([]); setCoverImage(''); }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'addAlbum' ? 'bg-amber-50 text-amber-600' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <Plus className="h-5 w-5" />
              <span className="font-medium">Add New Album</span>
            </button>
            <button
              onClick={() => setActiveTab('categories')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'categories' ? 'bg-amber-50 text-amber-600' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <Tag className="h-5 w-5" />
              <span className="font-medium">Categories</span>
            </button>
            <button
              onClick={() => { setActiveTab('settings'); setPasswordMsg({ type: '', text: '' }); }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'settings' ? 'bg-amber-50 text-amber-600' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <Settings className="h-5 w-5" />
              <span className="font-medium">Settings</span>
            </button>
          </nav>
          
          <div className="p-4 border-t border-gray-100">
             <button onClick={() => navigate('/')} className="w-full mb-2 flex items-center justify-center space-x-2 px-4 py-2 text-sm text-gray-600 hover:text-amber-500 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
               Return Home
             </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 h-full overflow-y-auto bg-gray-50 flex flex-col hide-scrollbar" style={{ WebkitOverflowScrolling: 'touch' }} data-lenis-prevent>
        
        {/* Mobile Navigation */}
        <div className="md:hidden sticky top-0 z-20 flex flex-col w-full bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between px-4 py-3">
            <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>Admin Panel</h2>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-gray-600 hover:text-amber-600 bg-gray-50 rounded-lg transition-colors">
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
          
          {/* Mobile Menu Items */}
          {isMobileMenuOpen && (
            <div className="flex flex-col px-4 py-2 space-y-1 bg-white border-t border-gray-100 shadow-lg absolute top-full left-0 w-full animate-fadeIn">
              <button onClick={() => { setActiveTab('albums'); setIsMobileMenuOpen(false); }} className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'albums' ? 'bg-amber-50 text-amber-600' : 'text-gray-600 hover:bg-gray-50'}`}>
                <ImageIcon className="h-5 w-5" /><span>Manage Albums</span>
              </button>
              <button onClick={() => { setActiveTab('addAlbum'); setIsEditing(null); setAlbumTitle(''); setAlbumCategory(''); setExistingImages([]); setUploadedFiles([]); setPreviewUrls([]); setIsMobileMenuOpen(false); }} className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'addAlbum' ? 'bg-amber-50 text-amber-600' : 'text-gray-600 hover:bg-gray-50'}`}>
                <Plus className="h-5 w-5" /><span>{isEditing ? 'Edit Album' : 'Add Album'}</span>
              </button>
              <button onClick={() => { setActiveTab('categories'); setIsMobileMenuOpen(false); }} className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'categories' ? 'bg-amber-50 text-amber-600' : 'text-gray-600 hover:bg-gray-50'}`}>
                <Tag className="h-5 w-5" /><span>Categories</span>
              </button>
              <button onClick={() => { setActiveTab('settings'); setPasswordMsg({ type: '', text: '' }); setIsMobileMenuOpen(false); }} className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'settings' ? 'bg-amber-50 text-amber-600' : 'text-gray-600 hover:bg-gray-50'}`}>
                <Settings className="h-5 w-5" /><span>Settings</span>
              </button>
              
              <div className="pt-2 mt-2 border-t border-gray-100 space-y-1 pb-2">
                <button onClick={() => navigate('/')} className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
                  <ArrowLeft className="h-5 w-5" /><span>Return Home</span>
                </button>
                <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-600 bg-red-50 hover:bg-red-100 transition-colors">
                  <LogOut className="h-5 w-5" /><span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 sm:p-8 max-w-5xl mx-auto pb-12 w-full">
          {activeTab === 'albums' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Albums List</h3>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Photos</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {portfolioImages.map((album) => (
                        <tr key={album.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0 bg-gray-100 rounded">
                                <img className="h-10 w-10 rounded object-cover" src={getOptimizedUrl(album.coverImage || album.images?.[0]?.src || '', 100, 100)} alt="" loading="lazy" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{album.alt}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 capitalize">
                              {album.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {album.images.length}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button onClick={() => startEditAlbum(album)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                              <Edit2 className="h-5 w-5 inline" />
                            </button>
                            <button onClick={() => handleDeleteAlbum(album.id, album.alt)} className="text-red-600 hover:text-red-900">
                              <Trash2 className="h-5 w-5 inline" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden divide-y divide-gray-100">
                  {portfolioImages.map((album) => (
                    <div key={`mobile-${album.id}`} className="p-4 flex items-center justify-between">
                      <div className="flex items-center space-x-3 overflow-hidden">
                        <div className="h-12 w-12 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden">
                          <img className="h-full w-full object-cover" src={getOptimizedUrl(album.coverImage || album.images?.[0]?.src || '', 100, 100)} alt="" loading="lazy" />
                        </div>
                        <div className="truncate">
                          <div className="text-sm font-bold text-gray-900 truncate">{album.alt}</div>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="px-2 py-0.5 inline-flex text-[10px] leading-4 font-semibold rounded-full bg-blue-100 text-blue-800 capitalize">
                              {album.category}
                            </span>
                            <span className="text-xs text-gray-500">{album.images.length} photos</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-2 flex-shrink-0">
                        <button onClick={() => startEditAlbum(album)} className="p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors">
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleDeleteAlbum(album.id, album.alt)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'addAlbum' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">{isEditing ? 'Edit Album' : 'Create New Album'}</h3>
                {isEditing && (
                    <button onClick={() => {setIsEditing(null); setAlbumTitle(''); setAlbumCategory(''); setExistingImages([]); setUploadedFiles([]); setPreviewUrls([]); setCoverImage(''); setActiveTab('albums');}} className="text-gray-500 hover:text-red-500"><X className="h-6 w-6"/></button>
                )}
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Album Title</label>
                  <input
                    type="text"
                    value={albumTitle}
                    onChange={(e) => setAlbumTitle(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                    placeholder="e.g. Vintage Wedding"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <select
                    value={albumCategory}
                    onChange={(e) => setAlbumCategory(e.target.value)}
                    className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                  >
                    <option value="">Select a category</option>
                    {categories.filter(c => c.id !== 'all').map(c => (
                      <option key={c.id} value={c.id}>{c.label}</option>
                    ))}
                  </select>
                </div>
                
                {/* Drag and Drop Zone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload New Images</label>
                  <div 
                    {...getRootProps()} 
                    className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                      isDragActive ? 'border-amber-500 bg-amber-50' : 'border-gray-300 hover:border-amber-400'
                    }`}
                  >
                    <div className="space-y-1 text-center">
                      <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600 justify-center">
                        <input {...getInputProps()} />
                        <p className="pl-1">Drag and drop images here, or click to select files</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, WEBP up to 10MB</p>
                    </div>
                  </div>
                </div>

                {/* Combined Previews */}
                {(previewUrls.length > 0 || existingImages.length > 0) && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Album Images</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                      {/* Existing Images */}
                      {existingImages.map((url, index) => (
                        <div key={`existing-${index}`} className={`relative group rounded-md overflow-hidden aspect-square border-2 bg-gray-50 ${coverImage === url ? 'border-amber-500 shadow-md' : 'border-gray-200 hover:border-gray-300'}`}>
                          <img src={getOptimizedUrl(url, 300, 300)} alt={`existing ${index}`} className="w-full h-full object-cover opacity-80" loading="lazy" />
                          {coverImage === url && <div className="absolute top-0 left-0 bg-amber-500 text-white text-[10px] px-1 rounded-br-sm z-10">Cover</div>}
                          <button 
                            type="button"
                            onClick={(e) => { e.preventDefault(); setCoverImage(url); }}
                            className={`absolute top-1 left-1 ${coverImage === url ? 'text-amber-400 bg-black bg-opacity-30' : 'text-gray-300 bg-black bg-opacity-30'} rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity`}
                            title="Set as Cover"
                          >
                            <Star className="h-4 w-4" fill={coverImage === url ? "currentColor" : "none"} />
                          </button>
                          <button 
                            onClick={() => removeExistingPreview(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                      
                      {/* New Upload Previews */}
                      {previewUrls.map((url, index) => (
                        <div key={`new-${index}`} className={`relative group rounded-md overflow-hidden aspect-square border-2 bg-gray-50 ${coverImage === url ? 'border-amber-500 shadow-md' : 'border-gray-200 hover:border-gray-300'}`}>
                          <img src={url} alt={`preview ${index}`} className="w-full h-full object-cover" />
                          <div className="absolute bottom-0 left-0 bg-green-500 text-white text-[10px] px-1 rounded-tr-sm z-10">New</div>
                          {coverImage === url && <div className="absolute top-0 left-0 bg-amber-500 text-white text-[10px] px-1 rounded-br-sm z-10">Cover</div>}
                          <button 
                            type="button"
                            onClick={(e) => { e.preventDefault(); setCoverImage(url); }}
                            className={`absolute top-1 left-1 ${coverImage === url ? 'text-amber-400 bg-black bg-opacity-30' : 'text-gray-300 bg-black bg-opacity-30'} rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity`}
                            title="Set as Cover"
                          >
                            <Star className="h-4 w-4" fill={coverImage === url ? "currentColor" : "none"} />
                          </button>
                          <button 
                            onClick={() => removePreview(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-end pt-4 border-t border-gray-100">
                  <button
                    onClick={handleSaveAlbum}
                    disabled={isUploading}
                    className="flex items-center space-x-2 bg-amber-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-amber-600 transition-colors disabled:opacity-50"
                  >
                    <Save className="h-4 w-4" />
                    <span>{isUploading ? 'Saving...' : 'Save Album'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'categories' && (
            <div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Add New Category</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Label (e.g. New Born)</label>
                    <input
                      type="text"
                      value={newCategoryLabel}
                      onChange={(e) => setNewCategoryLabel(e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">ID (e.g. newborn)</label>
                    <div className="flex space-x-4">
                      <input
                        type="text"
                        value={newCategoryId}
                        onChange={(e) => setNewCategoryId(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''))}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                      />
                      <button
                        onClick={handleAddCategory}
                        className="mt-1 bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-amber-600 whitespace-nowrap"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-4">Existing Categories</h3>
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Label</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {categories.map((category) => (
                      <tr key={category.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.label}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{category.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          {category.id !== 'all' && (
                            <button
                              onClick={() => handleDeleteCategory(category.id, category.label)}
                              className="text-red-600 hover:text-red-900 bg-red-50 p-2 rounded-lg transition-colors inline-flex"
                              title="Delete category"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-xl mx-auto">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Security Settings</h3>
              
              {passwordMsg.text && (
                <div className={`p-4 rounded-lg mb-6 text-sm ${passwordMsg.type === 'error' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-green-50 text-green-600 border border-green-100'}`}>
                  {passwordMsg.text}
                </div>
              )}

              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Current Password</label>
                  <input
                    type="password"
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">New Password</label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                  />
                </div>
                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    disabled={isUpdatingPassword}
                    className="bg-gray-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 shadow-sm"
                  >
                    {isUpdatingPassword ? 'Updating...' : 'Update Password'}
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {deleteModal.type && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden transform transition-all animate-scaleIn">
            <div className="p-6 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg leading-6 font-bold text-gray-900 mb-2">Delete {deleteModal.type === 'album' ? 'Album' : 'Category'}</h3>
              <p className="text-sm text-gray-500 mb-6">
                Are you sure you want to delete <span className="font-semibold text-gray-800">"{deleteModal.name}"</span>? 
                This action cannot be undone and will permanently remove this {deleteModal.type}.
              </p>
              <div className="flex space-x-3 w-full">
                <button
                  type="button"
                  onClick={() => setDeleteModal({ type: null, id: null, name: '' })}
                  className="flex-1 bg-white border border-gray-300 rounded-xl px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={executeDelete}
                  className="flex-1 bg-red-600 border border-transparent rounded-xl px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors shadow-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
