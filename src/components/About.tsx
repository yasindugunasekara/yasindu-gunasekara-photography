import React from 'react';
import { Camera, Users, Award, BookOpen } from 'lucide-react';

const About: React.FC = () => {
  const highlights = [
    {
      icon: Camera,
      title: 'Photographer',
      description: 'Professional photographer with 10+ years of experience capturing life\'s beautiful moments'
    },
    {
      icon: BookOpen,
      title: 'Lecturer',
      description: 'Teaching photography techniques and artistic vision at leading photography institutes'
    },
    {
      icon: Users,
      title: 'Trainer',
      description: 'Conducting workshops and masterclasses for aspiring photographers worldwide'
    },
    {
      icon: Award,
      title: 'Judge',
      description: 'Serving as a judge in prestigious international photography competitions'
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&dpr=1"
                alt="Yasindu Gunasekara"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
            
            {/* Floating Stats */}
            <div className="absolute -bottom-8 -right-8 bg-white rounded-2xl p-6 shadow-xl">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-500">500+</div>
                <div className="text-gray-600 font-medium">Projects Completed</div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About Yasindu
            </h2>
            <div className="space-y-6 text-gray-600 text-lg leading-relaxed mb-8">
              <p>
                Welcome to my world of photography. I'm Yasindu Gunasekara, a passionate photographer 
                with over a decade of experience capturing life's most precious moments. My journey 
                began with a simple fascination for light and shadow, which has evolved into a 
                professional career spanning weddings, portraits, commercial projects, and artistic endeavors.
              </p>
              <p>
                Based in Sri Lanka, I've had the privilege of working with clients from around the globe, 
                each bringing their unique story to life through my lens. My approach combines technical 
                expertise with artistic vision, ensuring that every photograph not only captures a moment 
                but tells a compelling story.
              </p>
              <p>
                Beyond photography, I'm deeply committed to education and mentorship. As a lecturer and 
                trainer, I share my knowledge and passion with the next generation of photographers, 
                helping them develop their skills and find their unique artistic voice.
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
                  <div className="flex-shrink-0">
                    <highlight.icon className="h-8 w-8 text-yellow-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {highlight.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {highlight.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8">
              <button
                onClick={() => {
                  const element = document.querySelector('#contact');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-yellow-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-yellow-600 transition-colors duration-300"
              >
                Let's Work Together
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;