import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import GalleryPage from './pages/GalleryPage';
import ChatBot from './components/ChatBot';

function App() {
  useEffect(() => {
    const lenis = new Lenis();
    
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Services />
                <Portfolio />
                <About />
                <Contact />
                <ChatBot />
                <Footer />
              </>
            }
          />
          
          {/* Gallery Page */}
          <Route path="/gallery/:id" element={<GalleryPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
