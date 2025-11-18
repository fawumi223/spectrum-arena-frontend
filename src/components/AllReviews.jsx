import React, { useEffect, useState } from "react";

export default function AllReviews({ artisanId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const BASE_URL = process.env.REACT_APP_API_BASE || "http://127.0.0.1:8000/api";

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const resp = await fetch(`${BASE_URL}/artisans/${artisanId}/reviews/`);
      const data = await resp.json();

      setReviews(data);
      setLoading(false);
    } catch (err) {
      console.log("Reviews load error:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [artisanId]);

  return (
    <div className="bg-[#111827] p-6 rounded-xl border border-white/10 shadow-md mt-8">
      <h2 className="text-xl font-semibold mb-4 text-brightOrange">Reviews</h2>

      {loading && <p className="text-white/60">Loading reviews...</p>}

      {reviews.length === 0 && !loading && (
        <p className="text-white/60">No reviews yet.</p>
      )}

      <div className="space-y-4">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="p-4 bg-[#1a1d25] rounded-lg border border-white/10"
          >
            {/* User */}
            <p className="font-semibold text-white">{rev.user_name}</p>

            {/* Stars */}
            <p className="text-yellow-400 text-sm">
              {"⭐".repeat(rev.rating)}
            </p>

            {/* Comment */}
            <p className="text-white/60 mt-1">{rev.comment}</p>

            <p className="text-white/30 text-xs mt-2">{new Date(rev.created_at).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

