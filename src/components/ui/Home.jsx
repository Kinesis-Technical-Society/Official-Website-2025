import React, { lazy } from "react";

import GridDistortionPure from "../../ReactBits/GridDistortion";
import bg from "/image.webp";
import { Modal } from "@/AccertinityUI/animated-modal";
import WinnerPopup from "./WinnerPopUp";

const ThreeDCardDemo = lazy(() => import("../../AccertinityUI/HeroRight"));
const NavBar = lazy(() => import("./NavBar"));

const KinesisHeroSection = () => {
    return (
        <>
            <WinnerPopup />
            <GridDistortionPure
                imageSrc={bg}
                grid={10}
                mouse={0.1}
                strength={0.15}
                relaxation={0.9}
                className="custom-class lg:h-screen text-black w-full h-full relative z-30"
            >
                <NavBar />

                <div className="lg:h-screen h-auto w-11/12 sm:w-9/12 lg:pt-30 px-6 flex flex-col lg:flex-row items-center justify-between relative lg:pb-10 mx-auto pt-40 lg:gap-8 gap-1">
                    {/* Left Side */}
                    <div className="max-w-xl mx-auto min-w-[320px]">
                        <h2 className="leading-[1.3] text-4xl xl:text-5xl font-bold mb-4 text-white font-orbitron">
                            Story & Vision of <br />
                            <span className="bg-gradient-to-r from-[#B721FF] via-[#FA2B8F] to-[#FE8C00] text-transparent bg-clip-text">
                                Kinesis Technical Society
                            </span>
                        </h2>
                        <p className="text-lg text-white mb-6">
                            Unleash your tech potential with Kinesis Technical Society! 🚀 Explore,
                            innovate, and collaborate across domains to shape the future. 💡⚡
                        </p>
                        <div className="flex gap-4 flex-wrap">
                            <div className="relative inline-block cursor-pointer text-center rounded-3xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white font-bold text-base">
                                <Modal>
                                    <a
                                        href="/about"
                                        className="relative cursor-pointer flex justify-center items-center group/modal-btn text-white dark:text-black dark:bg-white bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 overflow-hidden rounded-3xl px-6 py-2"
                                    >
                                        <span className="transition-transform duration-500 group-hover/modal-btn:translate-x-40">
                                            Explore
                                        </span>
                                        <div className="absolute inset-0 z-20 flex items-center justify-center -translate-x-40 transition-transform duration-500 group-hover/modal-btn:translate-x-0">
                                            👉🏻
                                        </div>
                                    </a>
                                </Modal>
                            </div>
                        </div>
                    </div>

                    {/* Right Side (3D Card) */}
                    <ThreeDCardDemo />
                </div>
            </GridDistortionPure>
        </>
    );
};

export default KinesisHeroSection;
