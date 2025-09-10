import React, { useState } from 'react';
import Lightbox from 'react-image-lightbox';
import { portfolioImages } from '../data';
import { Filter } from 'lucide-react';
import 'react-image-lightbox/style.css';

const Portfolio: React.FC = () => {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'wedding', label: 'Wedding' },
    { id: 'portrait', label: 'Portrait' },
    { id: 'commercial', label: 'Commercial' },
    { id: 'food', label: 'Food' },
    { id: 'real-estate', label: 'Real Estate' },
    { id: 'aerial', label: 'Aerial' },
  ];

  const filteredImages = selectedCategory === 'all' 
    ? portfolioImages 
    : portfolioImages.filter(img => img.category === selectedCategory);

  const openLightbox = (index: number) => {
    setPhotoIndex(index);
    setIsOpen(true);
  };

  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            My Portfolio
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore a curated collection of my best work across various photography genres, 
            showcasing creativity, technical skill, and artistic vision.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <div className="flex items-center space-x-2 text-gray-600 mr-4">
            <Filter className="h-5 w-5" />
            <span className="font-medium">Filter:</span>
          </div>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-amber-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className="relative group cursor-pointer overflow-hidden rounded-2xl aspect-square"
              onClick={() => openLightbox(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center text-white">
                  <h3 className="text-lg font-semibold mb-2">{image.alt}</h3>
                  <p className="text-sm capitalize">{image.category.replace('-', ' ')}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {isOpen && (
          <Lightbox
            mainSrc={filteredImages[photoIndex].src}
            nextSrc={filteredImages[(photoIndex + 1) % filteredImages.length].src}
            prevSrc={filteredImages[(photoIndex + filteredImages.length - 1) % filteredImages.length].src}
            onCloseRequest={() => setIsOpen(false)}
            onMovePrevRequest={() =>
              setPhotoIndex((photoIndex + filteredImages.length - 1) % filteredImages.length)
            }
            onMoveNextRequest={() =>
              setPhotoIndex((photoIndex + 1) % filteredImages.length)
            }
            imageTitle={filteredImages[photoIndex].alt}
            imageCaption={`${filteredImages[photoIndex].category.replace('-', ' ')} photography`}
          />
        )}

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-gray-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors duration-300">
            Load More Images
          </button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;