import { motion } from "framer-motion";

const Logo = () => {
  return (
    <motion.h1
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute top-0 left-1 p-1 text-2xl font-semibold"
    >
      minimalist.
    </motion.h1>
  );
};

export default Logo;
