"use client";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { useState, useRef, useEffect, useId, useCallback } from "react";
import { motion } from "framer-motion";

const Slide = ({ slide, index, current, handleSlideClick }) => {
  const slideRef = useRef(null);
  const xRef = useRef(0);
  const yRef = useRef(0);
  const frameRef = useRef();
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    const animate = () => {
      if (!slideRef.current) return;
      const x = xRef.current;
      const y = yRef.current;
      slideRef.current.style.setProperty("--x", `${x}px`);
      slideRef.current.style.setProperty("--y", `${y}px`);
      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const handleMouseMove = (event) => {
    const el = slideRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    xRef.current = event.clientX - (r.left + Math.floor(r.width / 2));
    yRef.current = event.clientY - (r.top + Math.floor(r.height / 2));
  };

  const handleMouseLeave = () => {
    xRef.current = 0;
    yRef.current = 0;
  };

  const imageLoaded = (event) => {
    event.currentTarget.style.opacity = "1";
  };

  const { src, button, title, Description } = slide;

  return (
    <div className="![perspective:900px] ![transform-style:preserve-3d]">
      <li
        ref={slideRef}
        className="flex flex-1 flex-col md:items-center md:justify-center !relative text-center text-white opacity-100 transition-all duration-300 ease-in-out w-[70vmin] h-[50vmin] !mx-[4vmin] !z-10"
        onClick={() => handleSlideClick(index)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform:
            current !== index
              ? "scale(0.98) rotateX(8deg)"
              : "scale(1) rotateX(0deg)",
          transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          transformOrigin: "bottom",
        }}
      >
        <div
          className="!absolute !top-0 !left-0 w-full h-full bg-[#1D1F2F] rounded-[1%] !overflow-hidden transition-all duration-150 ease-out"
          style={{
            transform:
              current === index
                ? "translate3d(calc(var(--x) / 30), calc(var(--y) / 30), 0)"
                : "none",
          }}
        >
          <img
            className="!absolute !inset-0 !w-[120%] !h-[120%] object-cover opacity-100 transition-opacity duration-600 ease-in-out"
            style={{
              opacity: current === index ? 1 : 0.5,
              filter: showDescription ? "blur(5px)" : "none",
            }}
            alt={title}
            src={src}
            onLoad={imageLoaded}
            loading="eager"
            decoding="sync"
          />
          {current === index && (
            <div className="!absolute inset-0 bg-black/30 transition-all duration-1000" />
          )}
          {/* When description is visible, show overlay with description and Close button */}
          {showDescription && (
            <>
              <div className="!absolute inset-0 flex flex-col p-[4vmin] bg-black/50 text-white overflow-y-scroll thin-scrollbar">
                <div
                  className="text-start !mx-5 text-[8px] md:text-base [&_ul]:list-disc [&_ul]:ml-6 [&_li]:my-1"
                  dangerouslySetInnerHTML={{ __html: Description }}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDescription(false);
                  }}
                  className="md:!mt-6 !mt-2 !px-2 md:!px-4 !py-1 md!py-2 w-fit !mx-auto sm:text-sm text-black bg-white md:h-12 border border-transparent text-xs flex justify-center items-center rounded-2xl hover:shadow-lg transition duration-200 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
                >
                  Close
                </button>
              </div>
              <style jsx>{`
      .thin-scrollbar::-webkit-scrollbar {
        width: 4px;
      }
      .thin-scrollbar::-webkit-scrollbar-track {
        background: transparent;
      }
      .thin-scrollbar::-webkit-scrollbar-thumb {
        background-color: rgba(255, 255, 255, 0.4);
        border-radius: 4px;
      }
    `}</style>
            </>
          )}
        </div>

        {/* Render title and Explore button only when description overlay is NOT visible */}
        {!showDescription && (
          <article
            className={`!relative !p-[4vmin] transition-opacity duration-1000 ease-in-out ${current === index ? "opacity-100 visible" : "opacity-0 invisible"
              }`}
          >
            <h2 className="text-[14px] sm:text-lg md:text-2xl lg:text-4xl !mt-7 font-semibold !relative break-words">
              {title}
            </h2>
            <div className="flex justify-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDescription(true);
                }}
                className="md:!mt-10 !mt-12 sm:!mt-20 md:!px-4 !px-2 !py-2 md:!py-2 w-fit !mx-auto text-sm text-black bg-white md:h-12 border border-transparent flex justify-center items-center rounded-2xl hover:shadow-lg transition duration-200 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
              >
                {button}
              </button>
            </div>
          </article>
        )}
      </li>
    </div>
  );
};


const CarouselControl = ({ type, title, handleClick }) => {
  return (
    <button
      className={`w-10 h-10 flex items-center !mx-2 justify-center bg-white border-3 border-transparent rounded-full focus:border-[#0b0434] focus:outline-none hover:-translate-y-0.5 active:translate-y-0.5 transition duration-200 ${type === "previous" ? "rotate-180" : ""
        }`}
      title={title}
      onClick={handleClick}
    >
      <IconArrowNarrowRight className="text-neutral-600 dark:text-neutral-200" />
    </button>
  );
};

export function Carousel({ slides }) {
  const [current, setCurrent] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHoveringCarousel, setIsHoveringCarousel] = useState(false);
  const id = useId();

  const handlePreviousClick = useCallback(() => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  const handleNextClick = useCallback(() => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const handleSlideClick = useCallback((index) => {
    if (current !== index) setCurrent(index);
  }, [current]);

  useEffect(() => {
    const moveCursor = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <div className="relative w-full bg-gradient-to-b from-[#0b0434] via-[#4a4b8a] to-white text-white overflow-hidden flex flex-col items-center px-6 py-20">

      {!isHoveringCarousel && (
        <motion.div
          className="pointer-events-none fixed z-50 w-16 h-16 rounded-full bg-pink-400 blur-2xl opacity-60 mix-blend-lighten"
          style={{
            top: cursorPos.y - 32,
            left: cursorPos.x - 32,
          }}
          transition={{
            type: "tween",
            ease: "linear",
            duration: 0,
          }}
        />
      )}

      <motion.div
        className="text-center mb-5 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-center font-orbitron">
          <span className="text-white">Discover Our Latest </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-400 to-yellow-300">
            Endeavour
          </span>
        </h2>
      </motion.div>

      <motion.p
        className="text-center max-w-md text-base text-gray-300 mb-8 font-light tracking-wide z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        Powers the future of tech at our campus
      </motion.p>

      <motion.div
        className="relative z-10 w-[70vmin] h-[70vmin]"
        onMouseEnter={() => setIsHoveringCarousel(true)}
        onMouseLeave={() => setIsHoveringCarousel(false)}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        aria-labelledby={`carousel-heading-${id}`}
      >
        <ul
          className="absolute flex mx-[-4vmin] transition-transform duration-1000 ease-in-out"
          style={{
            transform: `translateX(-${current * (100 / slides.length)}%)`,
          }}
        >
          {slides.map((slide, index) => (
            <Slide
              key={index}
              slide={slide}
              index={index}
              current={current}
              handleSlideClick={handleSlideClick}
            />
          ))}
        </ul>

        <div className="absolute flex justify-center w-full top-[calc(80%+1rem)]">
          <CarouselControl
            type="previous"
            title="Go to previous slide"
            handleClick={handlePreviousClick}
          />
          <CarouselControl
            type="next"
            title="Go to next slide"
            handleClick={handleNextClick}
          />
        </div>
      </motion.div>
    </div>
  );
}
