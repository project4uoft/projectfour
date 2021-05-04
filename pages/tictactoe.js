import Head from "next/head";
import React from "react";
import TicTacToe from "../components/tictactoe/Tictactoe";
import { motion } from "framer-motion";

const Game1 = () => {
  return (
    <div className="justify-center">
      <Head>
        <title>Tic-tac-toe</title>
      </Head>
      <div>
        <motion.h1
          animate={{ scale: 1.5 }}
          className="mb-6 text-3xl font-bold text-center text-indigo-700"
        >
          Tic-tac-toe
        </motion.h1>
      </div>
      <TicTacToe />
    </div>
  );
};

export default Game1;
