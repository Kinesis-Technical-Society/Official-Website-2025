import { createContext, useState, useContext, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

// Create context for mouse enter state
const MouseEnterContext = createContext(undefined);

// Hook to use the context
export const useMouseEnter = () => {
  const context = useContext(MouseEnterContext);
  if (!context) throw new Error("useMouseEnter must be used within CardContainer");
  return context;
};

// Main container with 3D effect
export const CardContainer = ({
  children,
  className,
  containerClassName,
}) => {
  const containerRef = useRef(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    const el = containerRef.current;
    if (!el) return;

    const { left, top, width, height } = el.getBoundingClientRect();
    const x = ((e.clientX - left - width / 2) / 25).toFixed(2);
    const y = ((e.clientY - top - height / 2) / 25).toFixed(2);
    el.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  }, []);

  const resetTransform = () => {
    if (containerRef.current) {
      containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
    }
  };

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div
        className={cn("flex items-center justify-center", containerClassName)}
        style={{ perspective: "1000px" }}
      >
        <div
          ref={containerRef}
          className={cn(
            "flex items-center justify-center relative transition-all duration-200 ease-linear",
            className
          )}
          style={{ transformStyle: "preserve-3d" }}
          onMouseEnter={() => setIsMouseEntered(true)}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => {
            setIsMouseEntered(false);
            resetTransform();
          }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
};

// The body of the card (holds 3D-styled children)
export const CardBody = ({ children, className }) => (
  <div
    className={cn(
      "h-96 w-96 [transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d]",
      className
    )}
  >
    {children}
  </div>
);

// Sub-item of the card with individual transform
export const CardItem = ({
  as: Tag = "div",
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}) => {
  const ref = useRef(null);
  const [isMouseEntered] = useMouseEnter();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const transform = isMouseEntered
      ? `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`
      : `translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;

    el.style.transform = transform;
  }, [
    isMouseEntered,
    translateX,
    translateY,
    translateZ,
    rotateX,
    rotateY,
    rotateZ,
  ]);

  return (
    <Tag
      ref={ref}
      className={cn("w-fit transition duration-200 ease-linear", className)}
      {...rest}
    >
      {children}
    </Tag>
  );
};
