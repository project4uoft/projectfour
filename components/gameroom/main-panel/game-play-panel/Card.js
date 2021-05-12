import React from "react";
import { motion } from "framer-motion";

const suitIcon = {
  diamonds: "♦",
  clubs: "♣",
  hearts: "♥",
  spades: "♠",
};
const Card = ({ suit, rank }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.2 }}
      className={`text-xl w-10 shadow-md h-16 p-0.5 mr-3 mb-4 text-${
        suit === "diamonds" || suit === "hearts" ? "red" : "black"
      }-600 border border-gray-400 rounded`}
    >
      {rank}
      {suitIcon[suit]}
    </motion.div>
  );
};

export default Card;
