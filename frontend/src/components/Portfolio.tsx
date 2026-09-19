import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Filter } from "lucide-react"; // assuming you're using lucide-react icons
import { useData } from '../context/DataContext';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Portfolio: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { categories, portfolioImages } = useData();

  const openGallery = (category: string) => {
    navigate(`/gallery/${category}`);
  };

  const getOptimizedUrl = (url: string) => {
    if (!url) return url;
    if (url.includes('cloudinary.com') && !url.includes('f_auto')) {
      // Add formatting rules: webp format, auto quality, and fill width for portfolio covers
      return url.replace('/upload/', '/upload/w_800,c_fill,f_auto,q_auto/');
    }
    return url;
  };

  // Filter images based on selected category
  const filteredImages =
    selectedCategory === "all"
      ? portfolioImages
      : portfolioImages.filter(
          (image) => image.category.toLowerCase() === selectedCategory
        );

  // Filter categories to only include "all" and those with at least one matching album
  const availableCategories = categories.filter(category => 
    category.id === "all" || portfolioImages.some(album => album.category.toLowerCase() === category.id.toLowerCase())
  );

  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <div className="flex items-center space-x-2 text-gray-600 mr-4">
            <Filter className="h-5 w-5" />
            <span className="font-medium">Filter:</span>
          </div>
          {availableCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? "bg-amber-500 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="relative group cursor-pointer overflow-hidden rounded-2xl aspect-square"
              onClick={() => openGallery(image.id)}
            >
              <LazyLoadImage
                src={getOptimizedUrl(image.coverImage || (image.images && image.images.length > 0 ? image.images[0].src : ""))}
                alt={`Image ${image?.id}`}
                effect="blur"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                wrapperClassName="w-full h-full"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center text-white">
                  <h3 className="text-lg font-semibold mb-2">{image.alt}</h3>
                  <p className="text-sm capitalize">
                    {image.category.replace("-", " ")}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Portfolio;
