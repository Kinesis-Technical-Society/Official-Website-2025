import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CalendarDays, Rocket } from "lucide-react";

const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};

const modalVariants = {
    hidden: { opacity: 0, scale: 0.85, y: -40 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { type: "spring", stiffness: 120, damping: 15 },
    },
    exit: { opacity: 0, scale: 0.9, y: -20 },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.2, type: "spring", stiffness: 100 },
    }),
};

const EventPopup = ({ events = [], isVisible, onClose }) => {
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleEsc);

        if (isVisible) {
            document.body.classList.add("no-scroll");
        } else {
            document.body.classList.remove("no-scroll");
        }

        return () => {
            document.removeEventListener("keydown", handleEsc);
            document.body.classList.remove("no-scroll");
        };
    }, [isVisible, onClose]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 bg-black/70 backdrop-blur-md z-[9998] flex justify-center items-start px-6 py-16 overflow-auto"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={overlayVariants}
                    onClick={onClose}
                >
                    <motion.div
                        className="flex flex-col max-w-4xl w-full bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] rounded-2xl shadow-2xl border border-white/10 overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center px-6 py-4 bg-[#171040] border-b border-white/10">
                            <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
                                <Rocket className="w-7 h-7 text-purple-400" />
                                Upcoming Events
                            </h1>
                            <button
                                className="text-gray-300 hover:text-red-400 transition"
                                onClick={onClose}
                            >
                                <X size={26} />
                            </button>
                        </div>

                        {/* Events */}
                        <div className="p-6 space-y-8">
                            {events.map((event, index) => (
                                <motion.div
                                    key={index}
                                    className="p-6 rounded-xl bg-white/5 border border-white/10 shadow-lg hover:shadow-purple-600/30 transition-all duration-300"
                                    custom={index}
                                    initial="hidden"
                                    animate="visible"
                                    variants={cardVariants}
                                >
                                    <h2 className="text-2xl font-bold mb-3 text-purple-300">
                                        {event.title}
                                    </h2>
                                    <p className="flex items-center text-sm text-gray-300 mb-4 gap-2">
                                        <CalendarDays size={16} className="text-indigo-400" />
                                        {event.date}
                                    </p>
                                    <p className="text-gray-200 mb-6 whitespace-pre-wrap leading-relaxed">
                                        {event.description}
                                    </p>
                                    <a
                                        href={event.registerLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block px-6 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium shadow-lg hover:shadow-indigo-500/50 hover:scale-105 transition-transform"
                                    >
                                        Register Now
                                    </a>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default EventPopup;
