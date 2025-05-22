import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { useOutsideClick } from "@/custom_hooks/use-outside-click";
export const HoverEffect = ({ cards }) => {
    let [hoveredIndex, setHoveredIndex] = useState(null);
    const [active, setActive] = useState(null);
    const id = useId();
    const ref = useRef(null);

    useEffect(() => {
        function onKeyDown(event) {
            if (event.key === "Escape") setActive(null);
        }
        document.body.style.overflow = active && typeof active === "object" ? "hidden" : "auto";
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [active]);

    useOutsideClick(ref, () => setActive(null));

    return (
        <section id="domains" className="min-h-screen bg-gradient-to-b from-[#ffffff] via-[#4a4b8a] to-[#0b0434] pt-32">
            <AnimatePresence>
                {active && typeof active === "object" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/20 h-full w-full z-10"
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {active && typeof active === "object" && (
                    <div className="fixed inset-0 grid place-items-center z-[100] px-4">
                        <motion.button
                            key={`button-${active.title}-${id}`}
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, transition: { duration: 0.05 } }}
                            className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-[#171040] text-xl rounded-full h-8 w-8"
                            onClick={() => setActive(null)}
                        >
                            <CloseIcon />
                        </motion.button>

                        <motion.div
                            layoutId={`card-${active.title}-${id}`}
                            ref={ref}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className=" max-w-[500px] flex flex-col bg-white dark:bg-neutral-900 rounded-xl overflow-hidden p-6"
                        >
                            <motion.div layoutId={`image-${active.title}-${id}`}>
                                <img
                                    src={active.src}
                                    alt={active.title}
                                    className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                                    loading="lazy"
                                />
                            </motion.div>

                            <div className="p-4 bg-[#2a115c] dark:bg-[#2a115c] rounded-b-xl">
                                <motion.h3
                                    layoutId={`title-${active.title}-${id}`}
                                    className="font-bold bg-gradient-to-r from-pink-300 to-purple-400 bg-clip-text text-transparent dark:text-white text-2xl mb-2 text-center"
                                >
                                    {active.title}
                                </motion.h3>
                                <motion.p
                                    layoutId={`description-${active.description}-${id}`}
                                    className="text-white dark:text-white text-base mb-2"
                                >
                                    {active.description}
                                </motion.p>

                                <motion.div
                                    layout
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="text-white text-xs md:text-sm lg:text-base flex [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                                >
                                    {typeof active.content === "function" ? active.content() : active.content}
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <motion.h2
                className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight font-orbitron"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                Our{" "}
                <motion.span
                    className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-indigo-800 to-cyan-700"
                    initial={{ backgroundPosition: "200% center" }}
                    animate={{ backgroundPosition: "0% center" }}
                    transition={{
                        duration: 2,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                    style={{ backgroundSize: "200%" }}
                >
                    Domains
                </motion.span>
            </motion.h2>

            <ul className="max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 items-center gap-6">
                {cards.map((item, idx) => (
                    <li
                        key={item?.link || idx}
                        onMouseEnter={() => setHoveredIndex(idx)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        onClick={() => setActive(item)}
                        className={`relative group block p-2 h-full w-full cursor-pointer ${idx === 4 ? 'md:col-span-2' : ''}`}
                    >
                        {hoveredIndex === idx && (
                            <motion.div
                                className="absolute inset-0 h-full w-full bg-white dark:bg-slate-800/[0.8] block rounded-3xl"
                                layoutId="hoverBackground"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1, transition: { duration: 0.15 } }}
                                exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
                            />
                        )}
                        <div className="block h-full w-full">
                            <TiltCard card={item} />
                        </div>
                    </li>
                ))}
            </ul>

        </section>
    );
};


export const CloseIcon = () => (
    <motion.svg
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.05 } }}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4 text-white"
    >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M18 6l-12 12" />
        <path d="M6 6l12 12" />
    </motion.svg>
);

function TiltCard({ card }) {
    const cardRef = useRef(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const smoothOptions = { damping: 15, stiffness: 400 };
    const smoothMouseX = useSpring(mouseX, smoothOptions);
    const smoothMouseY = useSpring(mouseY, smoothOptions);

    const rotateX = useTransform(smoothMouseY, [-100, 100], ["5deg", "-5deg"]);
    const rotateY = useTransform(smoothMouseX, [-100, 100], ["-10deg", "10deg"]);

    const handleMouseMove = (e) => {
        const rect = cardRef.current?.getBoundingClientRect();
        if (!rect) return;
        mouseX.set(e.clientX - rect.left - rect.width / 2);
        mouseY.set(e.clientY - rect.top - rect.height / 2);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group p-4 flex flex-col bg-gradient-to-b from-[#0b0434] via-[#4a4b8a] to-white dark:hover:bg-neutral-800 rounded-xl transition-all duration-300 ease-in-out"
            style={{ rotateX, rotateY }}
        >
            <div className="flex gap-4 flex-col w-full">
                <motion.div>
                    <img
                        src={card.src}
                        alt={card.title}
                        className="h-60 w-full rounded-lg object-cover object-top"
                        loading="lazy"
                    />
                </motion.div>
                <div className="flex justify-center items-center flex-col">
                    <motion.h3 className="text-black dark:text-neutral-200 text-center md:text-left text-xl font-black group-hover:text-black transition-all duration-300 ease-in-out mb-1">
                        {card.title}
                    </motion.h3>
                    <motion.p className="text-black dark:text-neutral-400 text-center md:text-left text-base group-hover:text-black transition-all duration-300 ease-in-out">
                        {card.description}
                    </motion.p>
                </div>
            </div>
        </motion.div>
    );
}
