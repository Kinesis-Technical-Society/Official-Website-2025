"use client";

import { slideData } from "../../data/slidesData";
import { Carousel } from "./Carousel";

export default function CarouselDemo() {
  return (
    <div className="relative overflow-hidden w-full h-full" id="events">
      <Carousel slides={slideData} />
    </div>
  );
}
