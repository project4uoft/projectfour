import React from "react";
import Square from "./Square";

const Board = ({ squares, onClick }) => (
  <div className="border-8 border-black w-96 h-96 grid grid-rows-3 grid-flow-col gap-4">
    {squares.map((square, i) => (
      <Square key={i} value={square} onClick={() => onClick(i)} />
    ))}
  </div>
);

export default Board;
