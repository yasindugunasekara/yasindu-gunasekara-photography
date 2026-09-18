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
      if (res.data.token) {
        login(res.data.token);
        navigate('/admin/dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-900"
    >
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=2000&auto=format&fit=crop')",
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-md px-6 py-12 lg:px-8">
        
        {/* Return to Home Button */}
        <button 
          onClick={() => navigate('/')} 
          className="absolute top-0 left-6 flex items-center space-x-2 text-white/70 hover:text-white transition-colors text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Site</span>
        </button>

        <div className="backdrop-blur-xl bg-white/10 p-8 sm:p-10 rounded-3xl shadow-2xl border border-white/20 mt-8">
          <div className="text-center mb-8">
            <div className="mx-auto h-16 w-16 bg-white/20 rounded-full flex items-center justify-center mb-4 border border-white/30 shadow-inner">
              <Camera className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Admin Portal
            </h2>
            <p className="mt-2 text-sm text-gray-300">
              Secure login to your photography workspace
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl text-sm text-center animate-fadeIn">
                {error}
              </div>
            )}
            
            <div className="space-y-4">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/50 group-focus-within:text-amber-400 transition-colors">
                  <User className="h-5 w-5" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-11 pr-3 py-3 border border-white/20 rounded-xl leading-5 bg-white/5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:bg-white/10 transition-all sm:text-sm"
                  placeholder="Username"
                />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/50 group-focus-within:text-amber-400 transition-colors">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-3 py-3 border border-white/20 rounded-xl leading-5 bg-white/5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:bg-white/10 transition-all sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-gray-900 bg-amber-400 hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-amber-500 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:animate-shine"></div>
                <span className="relative z-10">{isLoading ? 'Authenticating...' : 'Access Dashboard'}</span>
              </button>
            </div>
          </form>
        </div>
        
        {/* Footer credits/branding */}
        <div className="mt-8 text-center text-xs text-white/50">
          &copy; {new Date().getFullYear()} Yasindu Photography. All rights reserved.
        </div>
      </div>
      
      <style>{`
        @keyframes shine {
          100% { transform: translateX(100%) skew(-12deg); }
        }
        .animate-shine {
          animation: shine 1.5s infinite;
        }
      `}</style>
    </div>
  );
};

export default AdminLogin;
