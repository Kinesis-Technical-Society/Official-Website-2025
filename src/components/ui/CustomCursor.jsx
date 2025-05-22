import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MAX_TRAIL = 12;

const CustomCursor = () => {
  const positionRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef(null);
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      positionRef.current = { x: e.clientX, y: e.clientY };
      if (!frameRef.current) {
        frameRef.current = requestAnimationFrame(updateTrail);
      }
    };

    const updateTrail = () => {
      frameRef.current = null;
      const { x, y } = positionRef.current;

      const spreadX = (Math.random() - 0.5) * 20;
      const spreadY = (Math.random() - 0.5) * 20;

      setTrail((prev) => {
        const newTrail = [
          ...prev,
          {
            x: x + spreadX,
            y: y + spreadY,
            id: Date.now() + Math.random(),
          },
        ];
        return newTrail.length > MAX_TRAIL
          ? newTrail.slice(newTrail.length - MAX_TRAIL)
          : newTrail;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999]">
      <AnimatePresence>
        {trail.map((point) => (
          <motion.div
            key={point.id}
            className="w-4 h-4 rounded-full bg-pink-300 blur-[2px] shadow-md"
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              position: "absolute",
              top: point.y,
              left: point.x,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default CustomCursor;
