import React from "react";
import Square from "./Square";

const Board = ({ squares, onClick }) => (
  <>
    <div className="w-96 h-96 grid grid-rows-3 grid-flow-col gap-4">
      <img
        src="./assets/images/board.png"
        alt="tic tac toe board"
        className="h-96 absolute"
      />
      {squares.map((square, i) => (
        <Square key={i} value={square} onClick={() => onClick(i)} />
      ))}
    </div>
  </>
);

export default Board;
