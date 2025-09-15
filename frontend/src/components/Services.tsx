import React from 'react';
import { services } from '../data';
import { ArrowRight } from 'lucide-react';

const Services: React.FC = () => {
  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            My Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            I offer a comprehensive range of photography services, each tailored to capture 
            the unique essence of your special moments and professional needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="group relative bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col "
              style={{ minHeight: '350px' }}
            >
              {/* Full-size Image with overlay */}
              <div className="relative w-full h-full flex-1">
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                  style={{ minHeight: '350px' }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-70 transition-all duration-300"></div>
                {/* Overlayed Content */}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
                  <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                    {service.title}
                  </h3>
                  <p className="text-white mb-4 leading-relaxed drop-shadow-lg">
                    {service.description}
                  </p>
                  <button
                    onClick={scrollToContact}
                    className="flex items-center space-x-2 bg-yellow-500 text-white font-semibold px-6 py-2 rounded-full hover:bg-yellow-600 transition-colors duration-300 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto mt-2"
                  >
                    <span>Book Now</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="  p-8 ">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Create Something Beautiful?
            </h3>
            <p className="text-gray-600 mb-6">
              Let's discuss your photography needs and create stunning visuals together.
            </p>
            <button
              onClick={scrollToContact}
              className="bg-amber-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-amber-600 transition-colors duration-300"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;