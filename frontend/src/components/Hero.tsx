import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

const images = [
  "/dist/assets/heroPhoto/photo10.jpg",
  "/dist/assets/heroPhoto/photo5.jpg",
  "/dist/assets/heroPhoto/photo1.jpg",
  "/dist/assets/heroPhoto/photo7.jpg",
  "/dist/assets/heroPhoto/photo8.jpg",
  "/dist/assets/heroPhoto/photo9.jpg",
  "/dist/assets/heroPhoto/photo2.jpg",
  "/dist/assets/heroPhoto/DSC09883.jpg",
  
];



const Hero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000); // change every 1 second
    return () => clearInterval(interval);
  }, [images.length]);

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center transition-all duration-700"
      style={{
        backgroundImage: `url(${images[currentIndex]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Capturing Life's
          
            <span className="block text-gray-400">Beautiful Moments</span>
          </h1>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={scrollToContact}
            className="bg-amber-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-yellow-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
          >
            <span>Book Now</span>
            <ArrowRight className="h-5 w-5" />
          </button>
          <button
            onClick={() => {
              const element = document.querySelector('#portfolio');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="border-2 border-white text-white px-6 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300"
          >
            View Portfolio
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/4 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
