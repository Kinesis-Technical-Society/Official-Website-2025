"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";
import { CardBody, CardContainer } from "@/AccertinityUI/3d-card";
import blobImage from "/blob.webp";
import treeImage from "/tree.webp";

// Reusable Card component
const InfoCard = memo(({ title, description }) => (
    <div className="p-4 bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20 text-white">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold">{title}</h2>
        <p className="text-xs sm:text-sm md:text-base">{description}</p>
    </div>
));

const cardData = [
    {
        title: "INVENTIVE",
        description: "Going With The Trends - Respecting Classics",
        position: "top-[10%] sm:top-[20%] left-[-5%] sm:right-[15%] md:right-[25%]",
    },
    {
        title: "VISIONARY",
        description: "Dream. Design. Deliver.",
        position: "bottom-[15%] left-[5%] sm:left-[10%] md:left-[-10%]",
    },
    {
        title: "FUTURISTIC",
        description: "Crafting Tomorrow with Today’s Ideas",
        position: "bottom-[40%] sm:bottom-[35%] right-[-10%] sm:right-[-5%] md:right-[-10%]",
    },
];

export default function ThreeDCardDemo() {
    return (
        <CardContainer className="inter-var">
            <CardBody className="relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] sm:w-[30rem] h-auto rounded-xl p-6">
                <div className="relative w-full h-[400px] sm:h-screen flex items-center justify-center">

                    {/* Background Blob Animation */}
                    <motion.img
                        src={blobImage}
                        alt="Animated Background Blob"
                        loading="eager"
                        className="absolute z-10 w-[300px] sm:w-[400px] md:w-[450px] pointer-events-none"
                        animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* Futuristic Tree Image */}
                    <motion.img
                        src={treeImage}
                        alt="Futuristic Tree"
                        loading="eager"
                        className="absolute z-20 w-[120px] sm:w-[160px] md:w-[200px] invert brightness-[1000%] contrast-[1000%] drop-shadow-[0_0_10px_#ffffff] pointer-events-none"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                    />

                    {/* Text Cards */}
                    {cardData.map(({ title, description, position }, i) => (
                        <div
                            key={i}
                            className={`absolute z-30 w-[150px] sm:w-[220px] md:w-[300px] ${position}`}
                        >
                            <InfoCard title={title} description={description} />
                        </div>
                    ))}

                </div>
            </CardBody>
        </CardContainer>
    );
}
