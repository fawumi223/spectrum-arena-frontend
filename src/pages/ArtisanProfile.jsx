import React, { useState } from "react";
import { useParams } from "react-router-dom";
import mockArtisans from "../mocks/mockArtisans";
import { MapPin, Star } from "lucide-react";
import { saveHireRequest } from "../services/hireService";
import BackButton from "../components/BackButton";

export default function ArtisanProfile() {
  const { id } = useParams();
  const artisan = mockArtisans.find((a) => a.id === Number(id));
  const [showHire, setShowHire] = useState(false);

  if (!artisan) {
    return (
      <div className="min-h-screen bg-[#0d1018] text-white flex items-center justify-center">
        <p className="text-white/60">Artisan not found.</p>
      </div>
    );
  }

  async function submitHire(formData) {
    saveHireRequest({
      artisanId: id,
      artisanName: artisan.full_name,
      client: JSON.parse(localStorage.getItem("user") || "{}").full_name,
      timestamp: new Date().toISOString(),
      details: formData,
    });

    alert("Hire request submitted!");
    setShowHire(false);
  }

  return (
    <div className="min-h-screen bg-[#0d1018] text-white px-6 py-10">
      <div className="max-w-4xl mx-auto">

        <BackButton />

        {/* PROFILE */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={artisan.image}
            alt={artisan.full_name}
            className="h-40 w-40 object-cover rounded-full border border-white/10 shadow-md"
          />
          <h1 className="text-3xl font-bold mt-4 text-center">{artisan.full_name}</h1>
          <p className="text-center text-brightOrange text-lg">{artisan.skill}</p>

          <div className="flex items-center gap-2 mt-2 text-sm text-white/70">
            <Star size={14} className="text-yellow-400" />
            <span>{artisan.rating} ★</span>
          </div>

          <div className="flex items-center gap-1 text-white/60 mt-2">
            <MapPin size={14} />
            {artisan.city}, {artisan.state}
          </div>
        </div>

        {/* ABOUT */}
        <div className="bg-[#111827] border border-white/10 rounded-xl p-6 shadow mb-6">
          <h2 className="text-lg font-semibold mb-2">About</h2>
          <p className="text-white/70 text-sm leading-relaxed">
            Professional {artisan.skill.toLowerCase()} with over 3+ years of
            proven experience. Reliable, skilled and trusted by many clients.
          </p>
        </div>

        {/* CONTACT */}
        <div className="bg-[#111827] border border-white/10 rounded-xl p-6 shadow mb-6">
          <h2 className="text-lg font-semibold mb-2">Contact Details</h2>
          <p className="text-white/80 text-sm"><strong>Phone:</strong> 0903 000 0000</p>
          <p className="text-white/80 text-sm mt-1"><strong>City:</strong> {artisan.city}</p>
          <p className="text-white/80 text-sm mt-1"><strong>State:</strong> {artisan.state}</p>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <button
            onClick={() => setShowHire(true)}
            className="flex-1 bg-brightOrange text-deepBlue py-3 rounded-lg font-semibold hover:bg-orange-400"
          >
            Hire {artisan.full_name}
          </button>

          <button
            onClick={() => alert("Reviews coming soon")}
            className="flex-1 bg-[#1a1d25] border border-white/10 py-3 rounded-lg font-semibold"
          >
            Show Reviews
          </button>
        </div>

        {showHire && (
          <HireFormModal
            onClose={() => setShowHire(false)}
            onSubmit={submitHire}
            artisan={artisan}
          />
        )}
      </div>
    </div>
  );
}

function HireFormModal({ onClose, onSubmit, artisan }) {
  const [message, setMessage] = useState("");

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#111827] text-white p-6 rounded-xl w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">
          Hire {artisan.full_name}
        </h2>

        <textarea
          placeholder="Describe your request..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full bg-[#0d1018] border border-white/10 rounded-lg p-3 text-sm"
          rows={5}
        />

        <div className="flex gap-3 justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#1a1d25] rounded-lg border border-white/10"
          >
            Cancel
          </button>
          <button
            onClick={() => onSubmit({ message })}
            className="px-4 py-2 bg-brightOrange text-deepBlue font-semibold rounded-lg"
          >
            Send Request
          </button>
        </div>
      </div>
    </div>
  );
}

