import React from "react";

const Square = ({ value, onClick }) => {
  const style = value ? `squares ${value}` : `squares`;

  return (
    <button className="bg-gray-200 text-6xl cursor-pointer" onClick={onClick}>
      {value}
    </button>
  );
};

export default Square;
