"use client";
import React, { useRef, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export const HeroParallax = ({ products }) => {
    const ref = useRef(null);
    const firstRow = useMemo(() => products.slice(0, 5), [products]);
    const secondRow = useMemo(() => products.slice(5, 10), [products]);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const springConfig = { stiffness: 300, damping: 30, bounce: 50 };
    const translateX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 300]), springConfig);
    const translateXReverse = useSpring(useTransform(scrollYProgress, [0, 1], [0, -300]), springConfig);
    const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.2], [15, 0]), springConfig);
    const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.2, 1]), springConfig);
    const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.2], [20, 0]), springConfig);
    const translateY = useSpring(useTransform(scrollYProgress, [0, 0.2], [-200, 200]), springConfig);

    return (
        <div
            id="about"
            ref={ref}
            className="min-h-screen pt-32 pb-32 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d] bg-gradient-to-b from-[#0b0434] via-[#4a4b8a] to-white"
        >
            <Header />
            <motion.div style={{ rotateX, rotateZ, translateY, opacity }}>
                <motion.div className="flex justify-center space-x-4 mb-10">
                    {firstRow.map((product) => (
                        <ProductCard key={product.id} product={product} translate={translateX} />
                    ))}
                </motion.div>
                <motion.div className="flex justify-center space-x-4 mt-10">
                    {secondRow.map((product) => (
                        <ProductCard key={product.id} product={product} translate={translateXReverse} />
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
};

const Header = React.memo(() => (
    <div className="relative mx-auto py-0 md:py-0 px-4 w-9/12 left-0 top-0">
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
        <p className="text-base md:text-xl mt-8 text-white">
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
    </div>
));

const ProductCard = React.memo(({ product, translate }) => (
    <motion.div
        style={{ x: translate }}
        whileHover={{ y: -20 }}
        className="group/product relative shrink-0 h-[12.5rem] md:h-[15rem] lg:h-72 w-[15rem] md:w-[20rem] lg:w-[25rem] mb-6"
    >
        <img
            loading="eager"
            src={product.thumbnail}
            alt={product.title}
            className="object-cover object-center absolute h-full w-full inset-0"
        />
        <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none" />
        <h2 className="absolute top-4 left-4 opacity-0 group-hover/product:opacity-100 text-white text-sm md:text-lg">
            {product.title}
        </h2>
    </motion.div>
));

