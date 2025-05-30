import { motion } from "framer-motion";

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <motion.div
        className="flex flex-col items-center space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative w-20 h-20">
          <motion.div
            className="absolute inset-0 w-full h-full border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
            transition={{ repeat: Infinity, duration: 1 }}
          />
        </div>
        <motion.p
          className="text-lg text-white"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          Loading...
        </motion.p>
      </motion.div>
    </div>
  );
};

export default LoadingPage;
