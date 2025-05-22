"use client";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import CardDemo from "./card-demo";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { FaSquareBehance } from "react-icons/fa6";
import { FocusCards } from "@/AccertinityUI/focus-cards";
import cards from "../../data/founder";

export const AnimatedTestimonials = ({
    testimonials,
    autoplay = false,
}) => {
    const [active, setActive] = useState(0);

    const handleNext = () => {
        setActive((prev) => (prev + 1) % testimonials.length);
    };

    const handlePrev = () => {
        setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const isActive = (index) => index === active;

    useEffect(() => {
        if (autoplay) {
            const interval = setInterval(handleNext, 3000);
            return () => clearInterval(interval);
        }
    }, [autoplay]);

    const randomRotateY = () => Math.floor(Math.random() * 21) - 10;

    return (
        <section id="team" className="mx-auto px-4 font-sans antialiased md:px-8 lg:px-12 bg-gradient-to-b from-[#0b0434] via-[#4a4b8a] to-white pt-32">
            <div className="w-9/12 mx-auto text-center">
                <motion.div
                    className="text-center mb-12 z-10"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-center font-orbitron">
                        <span className="text-white">Our </span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-400 to-yellow-300">
                            Mentors
                        </span>
                    </h2>
                </motion.div>
            </div>

            {/* Top Cards */}
            <div className="flex justify-center flex-col items-center sm:flex-row mt-10 gap-8">
                <CardDemo
                    backgroundImage="/hodSir.webp"
                    title="Dean – Dr. Ajay Kumar Srivastava"
                    description="Ph.D. holder and certified educator guiding innovation, skill development, and academic excellence."
                    linkedin="https://www.linkedin.com/in/dr-ajay-kumar-shrivastava-870a291a/"
                />
                <CardDemo
                    backgroundImage="/ShivaniMam.webp"
                    title="Faculty Coordinator – Ms. Shivani"
                    description="Supports academics and student initiatives, ensuring smooth coordination and engagement."
                    linkedin="https://www.linkedin.com/in/shivani-kakria-363531217/"
                />
            </div>

            <div className="w-9/12 mx-auto text-center pt-15">
                <motion.div
                    className="text-center z-10"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-center font-orbitron">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-400 to-yellow-300">
                            Founders
                        </span>
                    </h2>
                </motion.div>
            </div>
            <FocusCards cards={cards} />

            {/* Animated Testimonials */}
            <div className="relative grid grid-cols-1 gap-20 md:grid-cols-2 w-9/12 mx-auto py-20">
                <div>
                    <div className="relative h-80 w-full">
                        <AnimatePresence>
                            {testimonials.map((testimonial, index) => (
                                <motion.div
                                    key={testimonial.src}
                                    initial={{
                                        opacity: 0,
                                        scale: 0.9,
                                        z: -100,
                                        rotate: randomRotateY(),
                                    }}
                                    animate={{
                                        opacity: isActive(index) ? 1 : 0.7,
                                        scale: isActive(index) ? 1 : 0.95,
                                        z: isActive(index) ? 0 : -100,
                                        rotate: isActive(index) ? 0 : randomRotateY(),
                                        zIndex: isActive(index) ? 20 : testimonials.length + 2 - index,
                                        y: isActive(index) ? [0, -80, 0] : 0,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        scale: 0.9,
                                        z: 100,
                                        rotate: randomRotateY(),
                                    }}
                                    transition={{
                                        duration: 0.4,
                                        ease: "easeInOut",
                                    }}
                                    className="absolute inset-0 origin-bottom"
                                >
                                    <img
                                        src={testimonial.src}
                                        alt={testimonial.name}
                                        loading="lazy"
                                        width={500}
                                        height={500}
                                        draggable={false}
                                        className="h-full w-full rounded-3xl object-cover object-center"
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Text Content */}
                <div className="flex flex-col justify-between py-4">
                    <motion.div
                        key={active}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                        <h3 className="text-2xl font-bold text-black dark:text-white">
                            {testimonials[active].name}
                        </h3>
                        <p className="text-sm text-gray-900 dark:text-neutral-500">
                            {testimonials[active].designation}
                        </p>

                        {/* Social Icons */}
                        <div className="flex gap-3 mt-4">
                            <a href={testimonials[active].linkedIn} target="_blank" rel="noopener noreferrer">
                                <FaLinkedin className="text-black dark:text-white hover:text-gray-300 text-3xl" />
                            </a>
                            {testimonials[active].github && <a href={testimonials[active].github} target="_blank" rel="noopener noreferrer">
                                <FaGithub className="text-black dark:text-white hover:text-gray-300 text-3xl" />
                            </a>}
                            {testimonials[active].behance && <a href={testimonials[active].behance} target="_blank" rel="noopener noreferrer">
                                <FaSquareBehance className="text-black dark:text-white hover:text-gray-300 text-3xl" />
                            </a>}
                        </div>

                        <motion.p className="mt-4 text-lg text-gray-900 dark:text-neutral-300">
                            {testimonials[active].quote.split(" ").map((word, index) => (
                                <motion.span
                                    key={index}
                                    initial={{
                                        filter: "blur(10px)",
                                        opacity: 0,
                                        y: 5,
                                    }}
                                    animate={{
                                        filter: "blur(0px)",
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    transition={{
                                        duration: 0.2,
                                        ease: "easeInOut",
                                        delay: 0.02 * index,
                                    }}
                                    className="inline-block"
                                >
                                    {word}&nbsp;
                                </motion.span>
                            ))}
                        </motion.p>
                    </motion.div>

                    {/* Navigation */}
                    <div className="flex gap-4 pt-12 md:pt-0">
                        <button
                            onClick={handlePrev}
                            className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800"
                        >
                            <IconArrowLeft className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:rotate-12 dark:text-neutral-400" />
                        </button>
                        <button
                            onClick={handleNext}
                            className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800"
                        >
                            <IconArrowRight className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:-rotate-12 dark:text-neutral-400" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
