import React from "react";

const Square = ({ value, onClick }) => {
  return (
    <button
      className="text-6xl cursor-pointer z-10 focus:outline-none"
      onClick={onClick}
    >
      <img src={`./assets/images/${value}.png`} className="p-1" />
    </button>
  );
};

export default Square;
