import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import GalleryPage from './pages/GalleryPage';

function App() {
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
