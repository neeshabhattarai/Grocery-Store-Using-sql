import React, { useState } from "react";
import { set } from "react-hook-form";
import { Rating } from "react-simple-star-rating";

export function Ratings({ rating, setRating }) {
  // Catch Rating value
  const handleRating = (rate: number) => {
    setRating(rate);
  };

  const handleReset = () => {
    // Set the initial value
    setRating(0);
  };

  return (
    <div className="App">
      {/* set initial value */}
      <Rating
        size={20}
        onClick={handleRating}
        onPointerMove={(value) => setRating(value)}
        initialValue={rating}
      />

      {/* <button onClick={handleReset}>reset</button> */}
    </div>
  );
}
