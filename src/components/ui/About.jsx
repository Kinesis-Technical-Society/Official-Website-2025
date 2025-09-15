"use client";
import React, { useRef, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { InfiniteMovingCards } from "./infinite-moving-cards";
import { products } from "../../data/products";

// export const HeroParallax = ({ products }) => {
//     const ref = useRef(null);
//     const firstRow = useMemo(() => products.slice(0, 5), [products]);
//     const secondRow = useMemo(() => products.slice(5, 10), [products]);

//     const { scrollYProgress } = useScroll({
//         target: ref,
//         offset: ["start start", "end start"],
//     });

//     const springConfig = { stiffness: 300, damping: 30, bounce: 50 };
//     const translateX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 300]), springConfig);
//     const translateXReverse = useSpring(useTransform(scrollYProgress, [0, 1], [0, -300]), springConfig);
//     const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.2], [15, 0]), springConfig);
//     const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.2, 1]), springConfig);
//     const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.2], [20, 0]), springConfig);
//     const translateY = useSpring(useTransform(scrollYProgress, [0, 0.2], [-200, 200]), springConfig);

//     return (
//         <div
//             id="about"
//             ref={ref}
//             className="min-h-screen pt-32 pb-32 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d] bg-gradient-to-b from-[#0b0434] via-[#4a4b8a] to-white"
//         >
//             <Header />
//             <motion.div style={{ rotateX, rotateZ, translateY, opacity }}>
//                 <motion.div className="flex justify-center space-x-4 mb-10">
//                     {firstRow.map((product) => (
//                         <ProductCard key={product.id} product={product} translate={translateX} />
//                     ))}
//                 </motion.div>
//                 <motion.div className="flex justify-center space-x-4 mt-10">
//                     {secondRow.map((product) => (
//                         <ProductCard key={product.id} product={product} translate={translateXReverse} /
//                     ))}
//                 </motion.div>
//             </motion.div>
//         </div>
//     );
// };

const testimonials = [
    {
        quote:
            "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
        name: "Charles Dickens",
        title: "A Tale of Two Cities",
    },
    {
        quote:
            "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
        name: "William Shakespeare",
        title: "Hamlet",
    },
    {
        quote: "All that we see or seem is but a dream within a dream.",
        name: "Edgar Allan Poe",
        title: "A Dream Within a Dream",
    },
    {
        quote:
            "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
        name: "Jane Austen",
        title: "Pride and Prejudice",
    },
    {
        quote:
            "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
        name: "Herman Melville",
        title: "Moby-Dick",
    },
];

export const Header = React.memo(() => (
    <div className="min-h-screen pt-32 pb-15 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d] bg-gradient-to-b from-[#0b0434] via-[#4a4b8a] to-white">
        <div className="w-9/12 mx-auto text-center">
            <motion.div
                className="text-center mb-12 z-10"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-center font-orbitron">
                    <span className="text-white">About Our </span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-400 to-yellow-300">
                        Society
                    </span>
                </h2>
            </motion.div>
        </div>
        <p className="text-base md:text-xl text-white w-9/12 mx-auto text-center">
            <strong>Kinesis Technical Society (KTS)</strong> is the official technical society of KIET Group of Institutions, built on the pillars of innovation, collaboration, and continuous learning. KTS provides a dynamic platform for students to explore and excel in various domains of technology.
            <br />
            <br />
            We focus on key areas such as:
            <br />
            <strong>•	Web Development</strong>
            <br />
            <strong>•	Android Development</strong>
            <br />
            <strong>•	Machine Learning & AI</strong>
            <br />
            <strong>•	UI/UX Design</strong>
            <br />
            <strong>•	Competitive Programming</strong>
            <br />
            <p className="text-base md:text-xl mt-8 text-gray-300">
                Our society organizes a wide range of activities including technical workshops, hackathons, coding competitions, and project showcases that encourage hands-on learning and creative problem-solving.
            </p>
            <p className="text-base md:text-xl mt-8 text-gray-200">KTS is more than just a club — it's a community of driven individuals who are passionate about technology, eager to innovate, and always ready to learn.</p>
        </p>
        <div className="h-[20rem] rounded-md flex flex-col antialiased dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
            <InfiniteMovingCards
                items={products}
                direction="right"
                speed="slow"
            />
        </div>
    </div>
));

// const ProductCard = React.memo(({ product, translate }) => (
//     <motion.div
//         style={{ x: translate }}
//         whileHover={{ y: -20 }}
//         className="group/product relative shrink-0 h-[12.5rem] md:h-[15rem] lg:h-72 w-[15rem] md:w-[20rem] lg:w-[25rem] mb-6"
//     >
//         <img
//             loading="eager"
//             src={product.thumbnail}
//             alt={product.title}
//             className="object-cover object-center absolute h-full w-full inset-0"
//         />
//         <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none" />
//         <h2 className="absolute top-4 left-4 opacity-0 group-hover/product:opacity-100 text-white text-sm md:text-lg">
//             {product.title}
//         </h2>
//     </motion.div>
// ));

