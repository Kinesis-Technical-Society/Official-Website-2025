import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowAltCircleUp } from 'react-icons/fa';
import { Routes, Route, useLocation } from 'react-router-dom'; // ✅ include useLocation

import Loader from './components/ui/Loader';
import CustomCursor from './components/ui/CustomCursor';
import { BackgroundBeamsWithCollision } from './components/ui/BgBeamsWithCollision';
import KinesisHeroSection from './components/ui/Home';
import { HeroParallax } from './components/ui/About';
import CarouselDemo from './components/ui/Events';
import Footer from './components/ui/Footer';
import { AnimatedTestimonials } from './components/ui/Animated_Testimonials';
import { HoverEffect } from './components/ui/OurDomains';
import NabBar from './components/ui/NavBar';
import { AppleCardsCarouselDemo } from './components/ui/AppleCardsCarouselDemo';
import NotFound from './components/ui/NotFound';

import { products } from './data/products';
import testimonials from './data/testimonials';
import domains from './data/domains';

import './App.css';
import EventPopup from './components/ui/EventPopUp';
import upcomingEvents from './data/upcomingEvents';
import ProjectsPage from './components/ui/Projects';

const App = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [showEventPopup, setShowEventPopup] = useState(false);

  useEffect(() => {
    if (location.pathname === '/') {
      const timer = setTimeout(() => setShowEventPopup(true), 500); // slight delay
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollBtnAnimation = {
    initial: { y: 0 },
    animate: { y: [0, -10, 0] },
    transition: { duration: 1.5, repeat: Infinity },
    whileHover: { scale: 1.2 }
  };

  const HomePage = () => (
    <>
      <BackgroundBeamsWithCollision className='w-full'>
        <KinesisHeroSection />
      </BackgroundBeamsWithCollision>
      <HeroParallax products={products} />
      <CarouselDemo />
      <HoverEffect cards={domains} />
      <AnimatedTestimonials testimonials={testimonials} />
    </>
  );

  const BlogPage = () => <AppleCardsCarouselDemo />;
  const Projects = () => <ProjectsPage />;

  if (loading) return <Loader />;

  const knownRoutes = ['/', '/blogs', '/projects'];
  const is404 = !knownRoutes.includes(location.pathname);

  return (
    <div className='cursor-none bg-gradient-to-b from-white via-[#fff8fc] to-[#fef6f9] w-full' id='home'>
      {!is404 && (
        <>
          <motion.div
            {...scrollBtnAnimation}
            className='fixed bottom-8 right-8 z-[9999] cursor-pointer'
            onClick={scrollToTop}
          >
            <FaArrowAltCircleUp className='text-[#171040] bg-white rounded-full text-6xl' />
          </motion.div>

          <CustomCursor />
          <NabBar />
        </>
      )}

      <EventPopup
        isVisible={showEventPopup}
        onClose={() => setShowEventPopup(false)}
        events={upcomingEvents}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blogs" element={<BlogPage />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {!is404 && <Footer />}
    </div>
  );
};

export default App;
