import React from "react";
import Square from "./Square";
import { motion } from "framer-motion";

const pathVariants = {
  hidden: {
    opacity: 0,
    pathLength: 0,
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    transition: {
      duartion: 5,
      ease: "easeInOut",
    },
  },
};

const Board = ({ squares, onClick, line }) => {
  return (
    <>
      <div>
        <svg
          className={`absolute z-20 h-96 ${line ? "" : "hidden"}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 13440 12624"
        >
          <g id="Layer_x0020_1">
            <metadata id="CorelCorpID_0Corel-Layer" />
            <motion.path
              initial="hidden"
              animate={line === 7 ? `visible` : ""}
              fill="transparent"
              stroke="red"
              strokeWidth="205"
              variants={pathVariants}
              d="M165 278c1747,2200 3770,3864 5835,5769l6312 6020"
            />
            <motion.path
              initial="hidden"
              animate={line === 8 ? `visible` : ""}
              fill="transparent"
              stroke="red"
              strokeWidth="205"
              variants={pathVariants}
              d="M12167 359c-1909,1993 -3911,3604 -5845,5701l-5817 6207"
            />
            <motion.path
              initial="hidden"
              animate={line === 2 ? `visible` : ""}
              fill="transparent"
              stroke="red"
              strokeWidth="205"
              variants={pathVariants}
              d="M6436 12623c18,-1437 -165,-3641 -228,-5201l-207 -7415"
            />
            <motion.path
              initial="hidden"
              animate={line === 5 ? `visible` : ""}
              fill="transparent"
              stroke="red"
              strokeWidth="205"
              variants={pathVariants}
              d="M12 6190c2209,-85 4494,30 6696,54l5729 41"
            />
            <motion.path
              initial="hidden"
              animate={line === 1 ? `visible` : ""}
              fill="transparent"
              stroke="red"
              strokeWidth="205"
              variants={pathVariants}
              d="M1648 7c-27,2283 218,5433 273,7853l142 4565"
            />
            <motion.path
              initial="hidden"
              animate={line === 3 ? `visible` : ""}
              fill="transparent"
              stroke="red"
              strokeWidth="205"
              variants={pathVariants}
              d="M10402 7c190,2595 214,5255 273,7853l142 4565"
            />
            <motion.path
              initial="hidden"
              animate={line === 4 ? `visible` : ""}
              fill="transparent"
              stroke="red"
              strokeWidth="205"
              variants={pathVariants}
              d="M12 1868c1801,219 4921,17 6874,39l5551 57"
            />
            <motion.path
              initial="hidden"
              animate={line === 6 ? `visible` : ""}
              fill="transparent"
              stroke="red"
              strokeWidth="205"
              variants={pathVariants}
              d="M12 10374c2261,5 4158,35 6360,60l6065 36"
            />
          </g>
        </svg>
        <motion.img
          initial={{ scale: 0.2 }}
          animate={{ scale: 1 }}
          src="./assets/images/board.png"
          alt="tic tac toe board"
          className="absolute h-96"
        />
        <div className="grid grid-flow-col grid-rows-3 gap-4 w-96 h-96">
          {squares.map((square, i) => (
            <Square key={i} value={square} onClick={() => onClick(i)} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Board;
