import React, { useState, useCallback, useMemo, lazy, Suspense, useEffect } from "react";
import {
    Navbar,
    NavBody,
    NavItems,
    MobileNav,
    MobileNavHeader,
    MobileNavMenu,
    MobileNavToggle,
    NavbarKietLogo,
    NavbarKtsLogo,
} from "../../AccertinityUI/ResizableNavbar";
import GridDistortionPure from "../../ReactBits/GridDistortion";
import bg from "/image.webp";
import { Modal, ModalTrigger } from "@/AccertinityUI/animated-modal";
import Contact from "./Contact";
import { MessageSquare } from "lucide-react"; // Add this if you're using lucide-react icons

const ThreeDCardDemo = lazy(() => import("../../AccertinityUI/HeroRight"));

const KinesisHeroSection = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isContactOpen, setContactOpen] = useState(false);

    const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);

    const navLinks = useMemo(
        () => [
            { name: "Home", link: "#home" },
            { name: "About", link: "#about" },
            { name: "Projects", link: "#domains" },
            { name: "Events", link: "#events" },
            { name: "Blogs", link: "#" },
            // Removed "Contact Us"
        ],
        []
    );

    const handleLinkClick = (item) => {
        setIsOpen(false);
        if (item.link) {
            document.querySelector(item.link)?.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        document.body.style.overflow = isContactOpen ? "hidden" : "auto";
    }, [isContactOpen]);

    return (
        <GridDistortionPure
            imageSrc={bg}
            grid={10}
            mouse={0.1}
            strength={0.15}
            relaxation={0.9}
            className="custom-class lg:h-screen text-black w-full h-full relative z-30"
        >
            <Navbar>
                {/* Desktop Navbar */}
                <NavBody>
                    <NavbarKtsLogo />
                    <NavItems
                        items={navLinks}
                        onItemClick={handleLinkClick}
                    />
                    <div className="mr-4">
                        <button
                            onClick={() => setContactOpen(true)}
                            className="relative group overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                        >
                            <span className="flex items-center justify-center gap-2 relative z-10 font-medium tracking-wide">
                                <span>Contact Us</span>
                            </span>
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </button>
                    </div>
                    <NavbarKietLogo />
                </NavBody>

                {/* Mobile Navbar */}
                <MobileNav>
                    <MobileNavHeader>
                        <div className="flex items-center gap-2">
                            <NavbarKtsLogo />
                            <NavbarKietLogo />
                        </div>
                        <MobileNavToggle isOpen={isOpen} onClick={toggleMenu} />
                    </MobileNavHeader>

                    <MobileNavMenu isOpen={isOpen}>
                        {navLinks.map((item, i) => (
                            <a
                                key={i}
                                href={item.link || "#"}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleLinkClick(item);
                                }}
                            >
                                {item.name}
                            </a>
                        ))}
                        {/* Get in Touch Button for Mobile Nav */}
                        <div className="mt-4">
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    setContactOpen(true);
                                }}
                                className="relative group overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                <span className="flex items-center justify-center gap-2 relative z-10 font-medium tracking-wide">
                                    <MessageSquare size={16} />
                                    <span>Contact Us</span>
                                </span>
                                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </button>
                        </div>
                    </MobileNavMenu>
                </MobileNav>
            </Navbar>

            {/* Hero Section */}
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
                        <Suspense fallback={<div className="text-white">Loading...</div>}>
                            <div className="relative inline-block cursor-pointer text-center rounded-3xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white font-bold text-base">
                                <Modal>
                                    <a href="#about">
                                        <ModalTrigger className="relative cursor-pointer flex justify-center items-center group/modal-btn text-white dark:text-black dark:bg-white bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 overflow-hidden rounded-3xl px-6 py-2">
                                            <span className="transition-transform duration-500 group-hover/modal-btn:translate-x-40">
                                                Explore
                                            </span>
                                            <div className="absolute inset-0 z-20 flex items-center justify-center -translate-x-40 transition-transform duration-500 group-hover/modal-btn:translate-x-0">
                                                👇🏻
                                            </div>
                                        </ModalTrigger>
                                    </a>
                                </Modal>
                            </div>
                        </Suspense>
                    </div>
                </div>

                {/* Right Side (3D Card) */}
                <Suspense fallback={<div className="text-white">Loading...</div>}>
                    <ThreeDCardDemo />
                </Suspense>
            </div>

            {/* Contact Modal */}
            <Modal>
                <Contact isOpen={isContactOpen} setIsOpen={setContactOpen} />
            </Modal>
        </GridDistortionPure>
    );
};

export default KinesisHeroSection;
