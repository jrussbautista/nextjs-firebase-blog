import React from "react";

const HeartButton = ({ onClick, fill }) => {
  return (
    <button onClick={onClick} className="btn btn-light">
      {fill ? (
        <i className="bi bi-heart-fill text-danger"></i>
      ) : (
        <i className="bi bi-heart"></i>
      )}
    </button>
  );
};

export default HeartButton;
