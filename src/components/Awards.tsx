import React from 'react';
import Slider from 'react-slick';
import { awards } from '../data';
import { Award, Calendar, Trophy } from 'lucide-react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Awards: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <section id="awards" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Trophy className="h-12 w-12 text-yellow-500" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Awards & Recognition
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            My work has been recognized by prestigious photography organizations worldwide, 
            reflecting my commitment to excellence and artistic innovation.
          </p>
        </div>

        {/* Awards Carousel */}
        <div className="awards-slider">
          <Slider {...settings}>
            {awards.map((award) => (
              <div key={award.id} className="px-3">
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  {/* Award Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={award.image}
                      alt={award.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {award.year}
                    </div>
                  </div>

                  {/* Award Content */}
                  <div className="p-6">
                    <div className="flex items-center space-x-2 text-yellow-500 mb-3">
                      <Award className="h-5 w-5" />
                      <span className="font-semibold text-sm">{award.organization}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {award.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {award.description}
                    </p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{award.year}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Achievement Stats */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-yellow-500 mb-2">15+</div>
              <div className="text-gray-600">Awards Won</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-500 mb-2">5</div>
              <div className="text-gray-600">International Recognition</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-500 mb-2">10+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-500 mb-2">3</div>
              <div className="text-gray-600">Photography Associations</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Awards;