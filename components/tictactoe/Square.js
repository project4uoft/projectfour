import React from "react";
import { motion } from "framer-motion";

const Square = ({ value, onClick }) => {
  return (
    <button
      className="z-10 text-6xl cursor-pointer focus:outline-none"
      onClick={onClick}
    >
      <motion.img
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        src={`./assets/images/${value}.png`}
        className="p-1"
      />
    </button>
  );
};

export default Square;
