import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { portfolioImages } from "../data";
import { Filter } from "lucide-react"; // assuming you're using lucide-react icons

interface Category {
  id: string;
  label: string;
}

const categories: Category[] = [
  { id: "all", label: "All" },
  { id: "portrait", label: "Portrait" },
  { id: "landscape", label: "Landscape" },
  { id: "wildlife", label: "Wildlife" },
  { id: "street", label: "Street" },
  { id: "astro", label: "Astro" },
];

const Portfolio: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const openGallery = (category: string) => {
    navigate(`/gallery/${category}`);
  };

  // Filter images based on selected category
  const filteredImages =
    selectedCategory === "all"
      ? portfolioImages
      : portfolioImages.filter(
          (image) => image.category.toLowerCase() === selectedCategory
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
          {categories.map((category) => (
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="relative group cursor-pointer overflow-hidden rounded-2xl aspect-square"
              onClick={() => openGallery(image.category)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
