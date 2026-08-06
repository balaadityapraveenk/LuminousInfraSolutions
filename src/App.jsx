import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Projects from './components/Projects';
import Solar from './components/Solar';

function Home() {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <Projects />
      <Contact />
    </>
  );
}

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('app-theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/solar" element={<Solar />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
