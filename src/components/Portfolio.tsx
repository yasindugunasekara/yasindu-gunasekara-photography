import React from "react";

import { useNavigate } from "react-router-dom";

import { portfolioImages } from "../data";



const Portfolio: React.FC = () => {

  const navigate = useNavigate();



  const openGallery = (category: string) => {

    navigate(`/gallery/${category}`);

  };



  return (

    <section id="portfolio" className="py-20 bg-white">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Portfolio Grid */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {portfolioImages.map((image) => (

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