"use client";;
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { FaLinkedin } from "react-icons/fa";

export const Card = React.memo(({
    card,
    index,
    hovered,
    setHovered
}) => (
    <div
        onMouseEnter={() => setHovered(index)}
        onMouseLeave={() => setHovered(null)}
        className={cn(
            "rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-48 md:h-56 w-[40%] sm:w-[40%] lg:w-[18%] transition-all duration-300 ease-out py-20"
        )}
    >
        <img src={card.src} loading="eager" alt={card.title} className="object-cover absolute inset-0 h-full w-full" />
        <div
            className={cn(
                "absolute inset-0 bg-black/50 flex flex-col justify-end items-start px-4 transition-opacity duration-300 py-4",
                hovered === index ? "opacity-100" : "opacity-0"
            )}>
            <a href={card.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="text-white hover:text-blue-500 text-3xl mb-1" />
            </a>
            <div
                className="text-xl md:text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200">
                {card.title}
            </div>
        </div>
    </div>
));

Card.displayName = "Card";

export function FocusCards({
    cards
}) {
    const [hovered, setHovered] = useState(null);

    return (
        <div className="flex flex-wrap gap-4 justify-center max-w-5xl mx-auto pt-8 w-11/12">
            {cards.map((card, index) => (
                <Card
                    key={card.title}
                    card={card}
                    index={index}
                    hovered={hovered}
                    setHovered={setHovered} />
            ))}
        </div>
    );
}
