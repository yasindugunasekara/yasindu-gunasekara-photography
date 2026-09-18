import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData, PortfolioImage, PortfolioImageItem, Category } from '../../context/DataContext';
import { LogOut, Plus, Trash2, Edit2, Image as ImageIcon, Tag, Save, X, UploadCloud } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const AdminDashboard: React.FC = () => {
  const { categories, portfolioImages, token, logout, addCategory, addAlbum, editAlbum, deleteAlbum } = useData();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'albums' | 'addAlbum' | 'categories'>('albums');

  // Add/Edit Album State
  const [isEditing, setIsEditing] = useState<string | number | null>(null);
  const [albumTitle, setAlbumTitle] = useState('');
  const [albumCategory, setAlbumCategory] = useState('');
  
  // Images already uploaded to Cloudinary
  const [existingImages, setExistingImages] = useState<string[]>([]);
  
  // New images to upload
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  
  const [isUploading, setIsUploading] = useState(false);

  // Add Category State
  const [newCategoryLabel, setNewCategoryLabel] = useState('');
  const [newCategoryId, setNewCategoryId] = useState('');

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
          headers: { 
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}` 
          }
        });
        cloudinaryUrls = uploadRes.data.urls;
      }

      const finalImages = [...existingImages, ...cloudinaryUrls];

      // 2. Save or Update Album
      if (isEditing) {
        await editAlbum(isEditing, {
          alt: albumTitle,
          category: albumCategory,
          images: finalImages
        });
      } else {
        await addAlbum({
          alt: albumTitle,
          category: albumCategory,
          images: finalImages
        });
      }

      // Reset
      setAlbumTitle('');
      setAlbumCategory('');
      setExistingImages([]);
      setUploadedFiles([]);
      setPreviewUrls([]);
      setIsEditing(null);
      setActiveTab('albums');
      
    } catch (err) {
      console.error(err);
      alert('Failed to save album. Make sure Cloudinary credentials are set in the backend.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddCategory = () => {
    if (!newCategoryLabel || !newCategoryId) {
      alert('Please fill all fields');
      return;
    }
    addCategory({ id: newCategoryId.toLowerCase(), label: newCategoryLabel });
    setNewCategoryLabel('');
    setNewCategoryId('');
    alert('Category added successfully!');
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
          
          <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
            <button
              onClick={() => setActiveTab('albums')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'albums' ? 'bg-amber-50 text-amber-600' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <ImageIcon className="h-5 w-5" />
              <span className="font-medium">Manage Albums</span>
            </button>
            <button
              onClick={() => { setActiveTab('addAlbum'); setIsEditing(null); setAlbumTitle(''); setAlbumCategory(''); setExistingImages([]); setUploadedFiles([]); setPreviewUrls([]); }}
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
      <main className="flex-1 h-full overflow-y-auto bg-gray-50" style={{ WebkitOverflowScrolling: 'touch' }}>
        <div className="p-8 max-w-5xl mx-auto pb-12">
          {activeTab === 'albums' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Albums List</h3>
              </div>
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
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
                            <div className="h-10 w-10 flex-shrink-0">
                              <img className="h-10 w-10 rounded object-cover" src={album.images?.[0]?.src || ''} alt="" />
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
                          <button onClick={() => deleteAlbum(album.id)} className="text-red-600 hover:text-red-900">
                            <Trash2 className="h-5 w-5 inline" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'addAlbum' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">{isEditing ? 'Edit Album' : 'Create New Album'}</h3>
                {isEditing && (
                    <button onClick={() => {setIsEditing(null); setAlbumTitle(''); setAlbumCategory(''); setExistingImages([]); setUploadedFiles([]); setPreviewUrls([]); setActiveTab('albums');}} className="text-gray-500 hover:text-red-500"><X className="h-6 w-6"/></button>
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
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
                      {/* Existing Images */}
                      {existingImages.map((url, index) => (
                        <div key={`existing-${index}`} className="relative group rounded-md overflow-hidden aspect-square border border-amber-300">
                          <img src={url} alt={`existing ${index}`} className="w-full h-full object-cover opacity-80" />
                          <div className="absolute top-0 left-0 bg-amber-500 text-white text-[10px] px-1 rounded-br-sm">Existing</div>
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
                        <div key={`new-${index}`} className="relative group rounded-md overflow-hidden aspect-square border border-green-300">
                          <img src={url} alt={`preview ${index}`} className="w-full h-full object-cover" />
                          <div className="absolute top-0 left-0 bg-green-500 text-white text-[10px] px-1 rounded-br-sm">New</div>
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
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {categories.map((category) => (
                      <tr key={category.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.label}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{category.id}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
