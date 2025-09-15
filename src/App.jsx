import React, { useState, useEffect, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { FaArrowAltCircleUp } from 'react-icons/fa';
import { Routes, Route, useLocation } from 'react-router-dom'; // ✅ include useLocation

import Loader from './components/ui/Loader';
import CustomCursor from './components/ui/CustomCursor';
import { BackgroundBeamsWithCollision } from './components/ui/BgBeamsWithCollision';
import KinesisHeroSection from './components/ui/Home';
// import { HeroParallax } from './components/ui/About';
// import CarouselDemo from './components/ui/Events';
// import Footer from './components/ui/Footer';
// import { AnimatedTestimonials } from './components/ui/Animated_Testimonials';
// import { HoverEffect } from './components/ui/OurDomains';
import NabBar from './components/ui/NavBar';
// import { AppleCardsCarouselDemo } from './components/ui/AppleCardsCarouselDemo';
import NotFound from './components/ui/NotFound';

import { products } from './data/products';
import testimonials from './data/testimonials';
import domains from './data/domains';
import Recruitment from './components/ui/Recruitment.jsx';

import './App.css';
import EventPopup from './components/ui/EventPopup';
import upcomingEvents from './data/upcomingEvents';
import ProjectsPage from './components/ui/Projects';
const Footer = lazy(() => import("./components/ui/Footer"));
const HeroParallax = lazy(() =>
  import("./components/ui/About").then((m) => ({ default: m.Header }))
);
const AnimatedTestimonials = lazy(() =>
  import("./components/ui/Animated_Testimonials").then((m) => ({
    default: m.AnimatedTestimonials,
  }))
);
const HoverEffect = lazy(() =>
  import("./components/ui/OurDomains").then((m) => ({ default: m.HoverEffect }))
);
const AppleCardsCarouselDemo = lazy(() =>
  import("./components/ui/AppleCardsCarouselDemo").then((m) => ({
    default: m.AppleCardsCarouselDemo,
  }))
);
const CarouselDemo = lazy(() => import("./components/ui/Events"));

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
      {/* <Suspense fallback={<Loader />}>
        <HeroParallax products={products} />
      </Suspense> */}
      {/* <Suspense fallback={<Loader />}>
        <CarouselDemo />
      </Suspense> */}

      {/* <Suspense fallback={<Loader />}>
        <HoverEffect cards={domains} />
      </Suspense> */}

      {/* <Suspense fallback={<Loader />}>
        <AnimatedTestimonials testimonials={testimonials} />
      </Suspense> */}
    </>
  );

  // const BlogPage = () => <AppleCardsCarouselDemo />;
  // const BlogPage = () => (
  //   <Suspense fallback={<Loader />}>
  //     <AppleCardsCarouselDemo />
  //   </Suspense>
  // );
  // const Projects = () => <ProjectsPage />;

  if (loading) return <Loader />;

  const knownRoutes = ['/about', '/blogs', '/projects', '/team', '/events', '/domains', '/register'];
  const is404 = !knownRoutes.includes(location.pathname) && location.pathname !== '/';
  const is404Footer = !knownRoutes.includes(location.pathname) && location.pathname !== '/';

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
        <Route path="/about" element={<HeroParallax products={products} />} />
        <Route path="/team" element={<AnimatedTestimonials testimonials={testimonials} />} />
        <Route path="/events" element={<CarouselDemo />} />
        <Route path="/blogs" element={<Suspense fallback={<Loader />}>
          <AppleCardsCarouselDemo />
        </Suspense>} />
        <Route path="/projects" element={<Suspense fallback={<Loader />}>
          <ProjectsPage />
        </Suspense>} />
        <Route path="/domains" element={<Suspense fallback={<Loader />}>
          <HoverEffect cards={domains} />
        </Suspense>} />
        <Route path="/register" element={<Suspense fallback={<Loader />}>
          <Recruitment />
        </Suspense>} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {!is404Footer && (
        <Suspense fallback={<Loader />}>
          <Footer />
        </Suspense>
      )}
    </div>
  );
};

export default App;
