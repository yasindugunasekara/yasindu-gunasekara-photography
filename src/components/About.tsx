import React from 'react';
import { Camera, BookOpen } from 'lucide-react';

const About: React.FC = () => {
  const highlights = [
    {
      icon: Camera,
      title: 'Photographer',
      description: 'Specialized in portrait, wildlife, landscape, event, and architectural photography'
    },
    {
      icon: BookOpen,
      title: 'IT Undergraduate',
      description: 'Bachelor of Science Honours in Information Technology at the University of Moratuwa'
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
                src="/dist/assets/profilePic/profilephoto.jpg"
                alt="Yasindu Gunasekara"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
            
            
            
          </div>

          {/* Content Side */}
          <div>
            <h2
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              About Yasindu Gunasekara
            </h2>
            <div className="space-y-6 text-gray-600 text-lg leading-relaxed mb-8" >
              <p>
  Welcome to my world of photography. I’m Yasindu Gunasekara, a passionate photographer dedicated to capturing the beauty of life through my lens. What began as a fascination for light, shadow, and composition has grown into a journey of storytelling—where every click preserves emotions, memories, and moments that words alone cannot express.
</p>

<p>
  My work spans across portrait, wildlife, landscape, and event photography. Whether it’s the intimacy of a portrait, the untamed beauty of wildlife, the grandeur of nature, or the energy of an event, I strive to bring out the essence of each subject. Every photograph is more than just an image—it is a visual story, carefully crafted to reflect depth, emotion, and meaning.
</p>

<p>
  Based in Sri Lanka, I’ve had the privilege of photographing diverse cultures, places, and people. Each project allows me to blend technical precision with artistic creativity, ensuring that my photography is both timeless and visually striking. My vision is simple: to create images that not only document but also inspire, connect, and leave a lasting impression.
</p>

<p>
  Alongside my passion for photography, I am also an undergraduate student at the University of Moratuwa, pursuing a Bachelor of Science Honours in Information Technology. This academic background has strengthened my skills in digital technologies, editing, and innovative approaches, allowing me to bring a modern and professional edge to my photography.
</p>

<p>
  Yasindu Gunasekara Photography is built on the belief that every moment has a story worth telling. Through my lens, I aim to transform fleeting instants into memories that last forever, giving clients more than photographs—giving them experiences captured in time.
</p>


            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
                  <div className="flex-shrink-0">
                    <highlight.icon className="h-8 w-8 text-amber-500" />
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
                className="bg-amber-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-amber-600 transition-colors duration-300"
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