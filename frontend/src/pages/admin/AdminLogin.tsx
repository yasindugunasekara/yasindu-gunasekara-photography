import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { User, Lock, ArrowLeft, Camera } from 'lucide-react';
import axios from 'axios';

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useData();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/login`, { username, password });
      if (res.data.success) {
        login();
        navigate('/admin/dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8 relative">
      
      {/* Return to Home Button */}
      <button 
        onClick={() => navigate('/')} 
        className="absolute top-6 left-6 flex items-center space-x-2 text-gray-500 hover:text-amber-600 transition-colors text-sm font-medium"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Site</span>
      </button>

      <div className="w-full max-w-md">
        <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto h-16 w-16 bg-amber-50 rounded-2xl flex items-center justify-center mb-6 text-amber-500">
              <Camera className="h-8 w-8" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Admin Portal
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Secure login to your photography workspace
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm text-center">
                {error}
              </div>
            )}
            
            <div className="space-y-4">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-amber-500 transition-colors">
                  <User className="h-5 w-5" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl leading-5 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent focus:bg-white transition-all sm:text-sm"
                  placeholder="Username"
                />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-amber-500 transition-colors">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl leading-5 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent focus:bg-white transition-all sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
              >
                {isLoading ? 'Authenticating...' : 'Access Dashboard'}
              </button>
            </div>
          </form>
        </div>
        
        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Yasindu Photography. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
