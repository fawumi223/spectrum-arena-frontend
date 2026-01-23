import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CreateSavings() {
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");
  const [unlockDate, setUnlockDate] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const BASE_URL =
    process.env.REACT_APP_API_BASE || "http://127.0.0.1:8000/api";

  // --------------------------------------------------
  // Convert date → duration_days (backend expects days)
  // --------------------------------------------------
  const calculateDurationDays = () => {
    const today = new Date();
    const unlock = new Date(unlockDate);

    const diffTime = unlock.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays > 0 ? diffDays : 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!amount || Number(amount) <= 0) {
      setMessage("Enter a valid amount");
      return;
    }

    if (!unlockDate) {
      setMessage("Select an unlock date");
      return;
    }

    const durationDays = calculateDurationDays();

    if (durationDays < 1) {
      setMessage("Unlock date must be in the future");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/savings/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: Number(amount),
          duration_days: durationDays,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        alert("Savings created successfully!");
        navigate("/savings");
      } else {
        setMessage(data.detail || "Failed to create savings");
      }
    } catch (err) {
      setLoading(false);
      setMessage("Network error. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-deepBlue text-white px-6 py-10">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-white/70 hover:text-white mb-8"
      >
        <ArrowLeft size={22} />
        <span>Back</span>
      </button>

      <h1 className="text-3xl font-bold mb-6">Create Savings Plan</h1>

      {message && <p className="text-red-400 mb-4">{message}</p>}

      <form
        onSubmit={submit}
        className="bg-[#111827] p-6 rounded-xl border border-white/10 space-y-5"
      >
        {/* AMOUNT */}
        <div>
          <label className="block mb-2 text-white/70">Amount</label>
          <input
            type="number"
            className="w-full bg-[#1f2937] p-3 text-white rounded-md outline-none"
            placeholder="₦5000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        {/* UNLOCK DATE */}
        <div>
          <label className="block mb-2 text-white/70">Unlock Date</label>
          <input
            type="date"
            className="w-full bg-[#1f2937] p-3 text-white rounded-md outline-none"
            value={unlockDate}
            onChange={(e) => setUnlockDate(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-brightOrange text-deepBlue font-bold py-3 rounded-lg disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create Savings"}
        </button>
      </form>
    </div>
  );
}

