import React, { useState } from "react";

export default function HireArtisanModal({ artisan, jobId, onClose }) {
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const BASE_URL = process.env.REACT_APP_API_BASE || "http://127.0.0.1:8000/api";

  const submitHire = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in.");
        return;
      }

      const resp = await fetch(`${BASE_URL}/artisans/${artisan.id}/hire/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          description,
          address,
          date,
          job: jobId || null,
        }),
      });

      const data = await resp.json();

      if (resp.ok) {
        alert("Hire request submitted successfully!");
        onClose();
      } else {
        alert(data.error || "Something went wrong.");
      }

    } catch (err) {
      console.log("Hire error:", err);
      alert("Network error.");
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-[#111827] text-white p-6 rounded-xl max-w-lg w-full shadow-xl border border-white/10">
        
        <h2 className="text-2xl font-bold mb-4 text-brightOrange">
          Hire {artisan.full_name}
        </h2>

        {/* Description */}
        <textarea
          className="w-full p-3 rounded-md bg-[#1a1d25] outline-none text-white mb-3"
          rows={3}
          placeholder="Describe the job..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        {/* Address */}
        <input
          className="w-full p-3 rounded-md bg-[#1a1d25] outline-none text-white mb-3"
          placeholder="Work address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        {/* Date */}
        <input
          type="date"
          className="w-full p-3 rounded-md bg-[#1a1d25] outline-none text-white mb-4"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-600 rounded-md hover:bg-gray-500 transition"
          >
            Cancel
          </button>

          <button
            onClick={submitHire}
            disabled={loading}
            className="px-6 py-2 bg-brightOrange text-deepBlue font-semibold rounded-md hover:bg-orange-400 transition"
          >
            {loading ? "Sending..." : "Submit Hire Request"}
          </button>
        </div>
      </div>
    </div>
  );
}

