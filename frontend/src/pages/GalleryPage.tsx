import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useData } from '../context/DataContext';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const GalleryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { portfolioImages } = useData();
  const gallery = portfolioImages.find((g) => String(g.id) === String(id));

  const [visibleCount, setVisibleCount] = useState(20);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const getOptimizedUrl = (url: string) => {
    if (!url) return url;
    if (url.includes('cloudinary.com') && !url.includes('f_auto')) {
      return url.replace('/upload/', '/upload/f_auto,q_auto/');
    }
    return url;
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowRight') handleNext(e as any);
      if (e.key === 'ArrowLeft') handlePrev(e as any);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex]);

  if (!gallery) {
    return <h2 className="text-center mt-20 text-xl">Gallery not found</h2>;
  }

  const visibleImages = gallery.images.slice(0, visibleCount);
  const hasMore = visibleCount < gallery.images.length;

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 20);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null && selectedIndex < gallery.images.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <br/>
      <h1
        className="text-4xl font-bold mb-10 text-center text-black tracking-wide drop-shadow-md"
        style={{
          fontFamily: "'Playfair Display', 'Montserrat', Arial, sans-serif",
          letterSpacing: "0.03em",
        }}
      >
        {gallery.alt}
      </h1>
      
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
        {visibleImages.map((img, index) => (
          <div
            key={img.id}
            className="aspect-[3/4] rounded-xl overflow-hidden shadow-lg transition-transform cursor-pointer hover:scale-105"
            title="Click to view full image"
            onClick={() => setSelectedIndex(index)}
          >
            <LazyLoadImage
              src={getOptimizedUrl(img.src)}
              alt={gallery.alt}
              effect="blur"
              className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
              wrapperClassName="w-full h-full"
            />
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="mt-12 flex justify-center">
          <button 
            onClick={handleLoadMore}
            className="px-8 py-3 bg-amber-500 text-white font-semibold rounded-full hover:bg-amber-600 transition-colors shadow-md hover:shadow-lg"
          >
            Load More
          </button>
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-95 p-4 sm:p-8"
          onClick={() => setSelectedIndex(null)}
        >
          <button 
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white hover:text-gray-300 z-[110] bg-black bg-opacity-50 rounded-full p-2"
            onClick={() => setSelectedIndex(null)}
          >
            <X className="w-8 h-8" />
          </button>
          
          <div className="relative w-full h-full flex items-center justify-center">
            
            {/* Invisible clickable areas for easy swiping/clicking on mobile & desktop */}
            {selectedIndex > 0 && (
              <div 
                className="absolute inset-y-0 left-0 w-1/3 z-10 cursor-pointer" 
                onClick={(e) => { e.stopPropagation(); handlePrev(e as any); }} 
              />
            )}
            {selectedIndex < gallery.images.length - 1 && (
              <div 
                className="absolute inset-y-0 right-0 w-1/3 z-10 cursor-pointer" 
                onClick={(e) => { e.stopPropagation(); handleNext(e as any); }} 
              />
            )}

            {selectedIndex > 0 && (
              <button 
                className="absolute left-2 sm:left-4 text-white hover:text-gray-300 bg-black bg-opacity-50 hover:bg-opacity-80 rounded-full p-2 sm:p-3 transition-all z-20"
                onClick={handlePrev}
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
            )}

            <img 
              src={getOptimizedUrl(gallery.images[selectedIndex].src)} 
              alt="Fullscreen view" 
              className="max-h-full max-w-full object-contain drop-shadow-2xl select-none z-0"
              onClick={(e) => e.stopPropagation()} 
            />

            {selectedIndex < gallery.images.length - 1 && (
              <button 
                className="absolute right-2 sm:right-4 text-white hover:text-gray-300 bg-black bg-opacity-50 hover:bg-opacity-80 rounded-full p-2 sm:p-3 transition-all z-20"
                onClick={handleNext}
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            )}
          </div>
          
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-50 px-4 py-1 rounded-full text-sm">
            {selectedIndex + 1} / {gallery.images.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
