import React from 'react';
import { Camera, Facebook, Instagram, Linkedin, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-black text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand Section */}
        <div className="lg:col-span-2">
        <div className="flex items-center space-x-2 mb-6">
          <Camera className="h-8 w-8 text-yellow-500" />
          <span className="text-2xl font-bold">Yasindu Gunasekara</span>
        </div>
        <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
          Professional photographer specializing in capturing life's beautiful moments. 
          From weddings to commercial projects, I bring artistic vision and technical 
          excellence to every shoot.
        </p>
        <div className="flex space-x-4">
          <a
          href="https://web.facebook.com/p/Yasindu-gunasekara-photography-61559091030891/?_rdc=1&_rdr#"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-yellow-500 transition-colors duration-300"
          >
          <Facebook className="h-5 w-5" />
          </a>
          <a
          href="https://www.instagram.com/yasindu_gunasekara/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-yellow-500 transition-colors duration-300"
          >
          <Instagram className="h-5 w-5" />
          </a>
          <a
          href="https://www.linkedin.com/in/yasindu-gunasekara-5a247a27b/?originalSubdomain=lk"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-yellow-500 transition-colors duration-300"
          >
          <Linkedin className="h-5 w-5" />
          </a>
        </div>
        </div>

        {/* Quick Links */}
        <div>
        <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
        <ul className="space-y-3">
          {[
          { href: '#home', label: 'Home' },
          { href: '#portfolio', label: 'Portfolio' },
          { href: '#services', label: 'Services' },
          { href: '#about', label: 'About' },
          { href: '#contact', label: 'Contact' }
          ].map((link) => (
          <li key={link.href}>
            <button
            onClick={() => scrollToSection(link.href)}
            className="text-gray-300 hover:text-yellow-500 transition-colors duration-300"
            >
            {link.label}
            </button>
          </li>
          ))}
        </ul>
        </div>

        {/* Contact Info */}
        
        <div>
        <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
          <Phone className="h-5 w-5 text-yellow-500" />
          <span className="text-gray-300">+9476 3771401</span>
          </div>
          <div className="flex items-center space-x-3">
          <Mail className="h-5 w-5 text-yellow-500" />
          <a href="mailto:ramrasu2017@gmail.com" className="text-gray-300 hover:text-yellow-500 transition-colors duration-300">
            ramrasu2017@gmail.com
          </a>
          </div>
          <div className="mt-6">
          <h4 className="font-semibold mb-2">Business Hours</h4>
          <div className="text-sm text-gray-300 space-y-1">
            <div>Mon-Fri: 9:00 AM - 6:00 PM</div>
            <div>Sat: 10:00 AM - 4:00 PM</div>
            <div>Sun: By appointment</div>
          </div>
          </div>
        </div>
        </div>
      </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="text-gray-400 text-sm mb-4 md:mb-0">
          © {new Date().getFullYear()} Yasindu Gunasekara Photography. All rights reserved.
        </div>
        <div className="flex space-x-6 text-sm text-gray-400">
          <a href="#" className="hover:text-yellow-500 transition-colors duration-300">
          Privacy Policy
          </a>
          <a href="#" className="hover:text-yellow-500 transition-colors duration-300">
          Terms of Service
          </a>
          <a href="#" className="hover:text-yellow-500 transition-colors duration-300">
          Cookies
          </a>
        </div>
        </div>
      </div>
      </div>
    </footer>
  );
};

export default Footer;