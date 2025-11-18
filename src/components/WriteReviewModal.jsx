import React, { useState } from "react";
import StarRating from "./StarRating";

export default function WriteReviewModal({ artisan, onClose, onSuccess }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const BASE_URL = process.env.REACT_APP_API_BASE || "http://127.0.0.1:8000/api";

  const submitReview = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in.");
        return;
      }

      const resp = await fetch(`${BASE_URL}/artisans/${artisan.id}/reviews/add/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          rating,
          comment,
        }),
      });

      const data = await resp.json();

      if (resp.ok) {
        alert("Review submitted successfully!");
        onSuccess(); // reload reviews
        onClose();
      } else {
        alert(data.error || "Something went wrong.");
      }
    } catch (err) {
      console.log("Review error:", err);
      alert("Network error");
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-[#111827] text-white p-6 rounded-xl max-w-lg w-full shadow-xl border border-white/10">

        <h2 className="text-2xl font-bold mb-4 text-brightOrange">
          Review {artisan.full_name}
        </h2>

        {/* STARS */}
        <StarRating rating={rating} setRating={setRating} />

        {/* COMMENT */}
        <textarea
          className="w-full p-3 rounded-md bg-[#1a1d25] outline-none text-white mt-4 mb-4"
          rows={3}
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>

        {/* ACTION BUTTONS */}
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-600 rounded-md hover:bg-gray-500 transition"
          >
            Cancel
          </button>

          <button
            onClick={submitReview}
            disabled={loading}
            className="px-6 py-2 bg-brightOrange text-deepBlue font-semibold rounded-md hover:bg-orange-400 transition"
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </div>
    </div>
  );
}

