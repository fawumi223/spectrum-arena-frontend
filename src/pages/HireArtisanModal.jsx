import React, { useState } from "react";

export default function HireArtisanModal({ artisan, onClose, onSubmit }) {
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");

  function submit(e) {
    e.preventDefault();
    onSubmit({ description, address, date });
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#0d0f14] text-white p-6 rounded-xl w-full max-w-md relative">

        <button onClick={onClose} className="absolute top-4 left-4 text-gray-300">
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4">Hire {artisan.full_name}</h2>

        <form onSubmit={submit} className="flex flex-col gap-3">

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Job description"
            className="bg-[#1a1d25] rounded-md p-3 min-h-[100px]"
            required
          />

          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Service address"
            className="bg-[#1a1d25] rounded-md p-3"
            required
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="bg-[#1a1d25] rounded-md p-3"
          />

          <button className="mt-3 bg-brightOrange text-deepBlue font-semibold px-4 py-2 rounded-md">
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}

