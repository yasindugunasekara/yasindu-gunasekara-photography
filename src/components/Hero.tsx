import React from 'react';
import { ArrowRight, Award, Users, Camera } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: 'url(https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&dpr=1)',
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
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Capturing Life's
            <span className="block text-yellow-400">Beautiful Moments</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto">
            Professional photographer specializing in weddings, portraits, and commercial photography.
            Creating timeless memories with artistic vision and technical excellence.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mb-12 max-w-md mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Camera className="h-8 w-8 text-yellow-400" />
            </div>
            <div className="text-2xl font-bold">500+</div>
            <div className="text-sm opacity-80">Projects</div>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Users className="h-8 w-8 text-yellow-400" />
            </div>
            <div className="text-2xl font-bold">300+</div>
            <div className="text-sm opacity-80">Happy Clients</div>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Award className="h-8 w-8 text-yellow-400" />
            </div>
            <div className="text-2xl font-bold">15+</div>
            <div className="text-sm opacity-80">Awards</div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={scrollToContact}
            className="bg-yellow-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-yellow-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
          >
            <span>Book Now</span>
            <ArrowRight className="h-5 w-5" />
          </button>
          <button
            onClick={() => {
              const element = document.querySelector('#portfolio');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300"
          >
            View Portfolio
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;