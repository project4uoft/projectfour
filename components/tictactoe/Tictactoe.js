import React, { useState } from "react";
import { calculateWinner } from "./calculateWinner";
import Board from "./Board";
import { motion } from "framer-motion";

const TicTacToe = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  const [winner, line] = calculateWinner(history[stepNumber]);
  const xO = xIsNext ? "x" : "o";

  const handleClick = (i) => {
    const historyPoint = history.slice(0, stepNumber + 1);
    const current = historyPoint[stepNumber];
    const squares = [...current];
    // return if won or occupied
    if (winner || squares[i]) return;
    // select square
    squares[i] = xO;
    setHistory([...historyPoint, squares]);
    setStepNumber(historyPoint.length);
    setXisNext(!xIsNext);
  };

  const jumpTo = (step) => {
    if (step === 0) {
      setHistory([Array(9).fill(null)]);
    }
    setStepNumber(step);
    setXisNext(step % 2 === 0);
  };

  const renderMoves = () =>
    history.map((_step, move) => {
      const destination = move
        ? `Go to move #${move}`
        : "          Restart Game";
      return (
        <motion.li
          whileHover={{ scale: 1.2, color: "#00ff00" }}
          className="list-none"
          key={move}
        >
          <button key={move} className="p-1" onClick={() => jumpTo(move)}>
            {destination}
          </button>
        </motion.li>
      );
    });

  return (
    <>
      <div className="flex justify-around w-screen">
        <div>
          <motion.h3
            animate={{ scale: 1.3 }}
            className="text-2xl font-semibold text-indigo-700"
          >
            {winner ? "Winner: " : "Next Player: "}
            <span>{winner ? winner.toUpperCase() : xO.toUpperCase()}</span>
          </motion.h3>
        </div>
        <div>
          <Board
            squares={history[stepNumber]}
            onClick={handleClick}
            line={line}
          />
        </div>
        <div>
          <motion.h3
            animate={{ scale: 1.3 }}
            className="font-semibold text-indigo-700 text-1xl"
          >
            History
          </motion.h3>
          <ul>{renderMoves()}</ul>
        </div>
      </div>
    </>
  );
};

export default TicTacToe;
