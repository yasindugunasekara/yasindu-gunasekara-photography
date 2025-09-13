import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { portfolioImages } from "../data/"; // Update import

const GalleryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const gallery = portfolioImages.find((g) => String(g.id) === String(id));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!gallery) {
    return <h2 className="text-center mt-20 text-xl">Gallery not found</h2>;
  }

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {gallery.images.map((img) => (
                <div
                key={img.id}
                className="aspect-[3/4] rounded-xl overflow-hidden shadow-lg transition-transform cursor-pointer hover:scale-105"
                title="Click to view full image"
                >
                <img
                  src={img.src}
                  alt={gallery.alt}
                  className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
                />
                </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;
