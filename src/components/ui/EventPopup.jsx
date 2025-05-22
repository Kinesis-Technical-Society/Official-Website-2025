import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};

const modalVariants = {
    hidden: { opacity: 0, y: '-30%' },
    visible: { opacity: 1, y: '0' },
};

const EventPopup = ({ events = [], isVisible, onClose }) => {
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleEsc);

        if (isVisible) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }

        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.classList.remove('no-scroll');
        };
    }, [isVisible, onClose]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 bg-transparent backdrop-blur-[4px] bg-opacity-40 z-[9998] flex justify-center items-start px-8 overflow-auto py-20"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={overlayVariants}
                    onClick={onClose}
                >
                    <div
                        className="flex flex-col max-w-3xl w-full border-3 border-white rounded-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="text-5xl font-bold text-center flex justify-between p-6 bg-white text-[#171040] rounded-t-md">
                            <h1>Upcoming Event</h1>
                            <button
                                className="text-gray-300 hover:text-red-500 text-xl cursor-pointer"
                                onClick={onClose}
                            >
                                ✖
                            </button>
                        </div>
                        {events.map((event, index) => (
                            <motion.div
                                key={index}
                                className="bg-[linear-gradient(to_bottom,_#4a4b8a_40%,_#0b0434_100%)] rounded-b-2xl w-full p-6 shadow-lg relative"
                                variants={modalVariants}
                            >
                                <h2 className="text-3xl font-bold mb-8 text-white">{event.title}</h2>
                                <p className="text-sm text-gray-200 mb-1">{event.date}</p>
                                <p className="text-gray-100 mb-4 whitespace-pre-wrap">{event.description}</p>
                                <a
                                    href={event.registerLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block bg-white text-[#171040] px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition"
                                >
                                    Register Now
                                </a>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default EventPopup;
