import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { galleries } from "../data/";
import { portfolioImages} from "../data";

const GalleryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const gallery = galleries.find((g) => g.id === id);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!gallery) {
    return <h2 className="text-center mt-20 text-xl">Gallery not found</h2>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">{gallery.title}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {gallery.images.map((img) => (
          <div
            key={img.id}
            className="aspect-[3/4] rounded-xl overflow-hidden shadow-lg transition-transform"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;
