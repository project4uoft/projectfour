import React, { useState } from "react";
import { calculateWinner } from "./helper";
import Board from "./Board";

const TicTacToe = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  const winner = calculateWinner(history[stepNumber]);
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
    setStepNumber(step);
    setXisNext(step % 2 === 0);
  };

  const renderMoves = () =>
    history.map((_step, move) => {
      const destination = move ? `Go to move #${move}` : "Go to Start";
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{destination}</button>
        </li>
      );
    });

  return (
    <>
      <div className="flex justify-around w-screen">
        <h3 className="text-2xl font-semibold text-indigo-700">
          {winner ? "Winner: " + winner : "Next Player: " + xO}
        </h3>
        <Board squares={history[stepNumber]} onClick={handleClick} />
        <div>
          <h3 className="text-2xl font-semibold text-indigo-700">History</h3>
          {renderMoves()}
        </div>
      </div>
    </>
  );
};

export default TicTacToe;
