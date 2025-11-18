import React from "react";

export default function StarRating({ rating, setRating, size = 28 }) {
  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => setRating(star)}
          className={`cursor-pointer ${
            star <= rating ? "text-yellow-400" : "text-gray-500"
          }`}
          style={{ fontSize: size }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

