import React from "react";
import { Camera, BookOpen } from "lucide-react";

const About: React.FC = () => {
  const highlights = [
    {
      icon: Camera,
      title: "Photographer",
      description:
        "Specialized in portrait, wildlife, landscape, event, and architectural photography",
    },
    {
      icon: BookOpen,
      title: "IT Undergraduate",
      description:
        "Bachelor of Science Honours in Information Technology at the University of Moratuwa",
    },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src="/assets/profilePic/DSC09834.jpg"
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
              style={{ fontFamily: "Arial, sans-serif" }}
            >
              About Yasindu Gunasekara
            </h2>
<div className="space-y-6 text-gray-600 text-lg leading-relaxed mb-8">
  <p>
    Hi, I’m Yasindu Gunasekara, a passionate photographer from Sri Lanka.  
    What began as a love for light, shadow, and composition has grown into a journey of storytelling—capturing emotions and memories that words can’t express.
  </p>

  <p>
    My work spans portraits, wildlife, landscapes, and events.  
    Each image is crafted to reflect depth, emotion, and meaning.
  </p>

  <p>
    Yasindu Gunasekara Photography is built on the belief that every moment has a story worth telling.  
    Through my lens, I transform fleeting instants into timeless memories.
  </p>
</div>


            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
                >
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
                  const element = document.querySelector("#contact");
                  if (element) element.scrollIntoView({ behavior: "smooth" });
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
