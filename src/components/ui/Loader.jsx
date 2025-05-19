import { ClipLoader } from 'react-spinners';
import { motion } from 'framer-motion';

const Loader = () => {
  const containerVariants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.8 }
  };

  const headingVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { delay: 0.3, duration: 0.8 }
  };

  const subTextVariants = {
    initial: { y: 10, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { delay: 0.6, type: 'spring', stiffness: 100 }
  };

  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-b from-[#0b0434] via-[#4a4b8a] to-white font-[Poppins] text-white">
      {/* Gradient background blobs */}
      <div className="absolute top-[-10%] left-[-10%] h-64 w-64 rounded-full bg-pink-500 blur-2xl opacity-20" />
      <div className="absolute bottom-[-15%] right-[-10%] h-72 w-72 rounded-full bg-cyan-400 blur-2xl opacity-20" />

      {/* Loader Card */}
      <motion.div
        {...containerVariants}
        className="z-10 flex flex-col items-center rounded-2xl px-10 py-8 text-center"
      >
        <ClipLoader size={60} color="#ffffff" aria-label="Loading Spinner" />

        <motion.h2 {...headingVariants} className="mt-6 text-xl sm:text-2xl font-semibold">
          Loading... please wait ✨
        </motion.h2>

        <motion.p {...subTextVariants} className="mt-3 text-sm text-gray-400">
          Getting things ready for you.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Loader;
