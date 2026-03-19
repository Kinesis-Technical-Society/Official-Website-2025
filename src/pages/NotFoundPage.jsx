import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#fff0f5] via-white to-[#fce4ec] flex items-center justify-center relative overflow-hidden px-4">
            {/* Glowing background circle */}
            <div className="absolute w-[600px] h-[600px] bg-pink-100 rounded-full blur-3xl opacity-50 animate-pulse top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0" />

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="z-10 text-center"
            >
                <motion.h1
                    className="text-7xl font-extrabold text-blue-900 drop-shadow mb-4"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                >
                    404
                </motion.h1>
                <motion.p
                    className="text-2xl text-gray-800 mb-6"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    Oops! The page you're looking for doesn't exist.
                </motion.p>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/')}
                    className="px-6 py-3 bg-blue-900 text-white rounded-full shadow-lg hover:bg-pink-700 transition"
                >
                    Go Back Home
                </motion.button>
            </motion.div>
        </div>
    );
};

export default NotFound;
