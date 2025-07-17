import { motion } from "framer-motion";

export default function MotionWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full h-full flex items-center justify-center"
      
    >
      {children}
    </motion.div>
  );
}
