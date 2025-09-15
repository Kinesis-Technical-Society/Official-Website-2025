"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { FaLinkedin, FaGithub } from "react-icons/fa";

function CardDemo({
    backgroundImage,
    title,
    description,
    linkedin
}) {
    return (
        <div className="max-w-xs w-full group/card">
            <div
                className={cn(
                    "cursor-pointer overflow-hidden relative card h-56 rounded-4xl shadow-xl max-w-sm mx-auto backgroundImage flex flex-col justify-between p-4"
                )}
                style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center", loading: "eager" }}
            >
                {/* Background Overlay */}
                <div className="absolute w-full h-full top-0 left-0 bg-black opacity-0 group-hover/card:opacity-60 transition-opacity duration-300"></div>

                {/* Text Content - hidden by default, shown on hover */}
                <div className="text content relative z-10 flex flex-col justify-end items-start h-full opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                    <h1 className="font-bold text-xl md:text-2xl text-gray-50 relative z-10">
                        {title}
                    </h1>
                    <p className="font-normal text-sm text-gray-50 relative z-10 my-4">
                        {description}
                    </p>
                    <div className="flex gap-3">
                        <a href={linkedin} target="_blank" rel="noopener noreferrer">
                            <FaLinkedin className="text-white hover:text-blue-500 text-3xl" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardDemo;
