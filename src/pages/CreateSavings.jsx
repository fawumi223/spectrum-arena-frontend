import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CreateSavings() {
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");
  const [lockedUntil, setLockedUntil] = useState("");
  const [message, setMessage] = useState("");

  const BASE_URL =
    process.env.REACT_APP_API_BASE || "http://127.0.0.1:8000/api";

  const submit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!lockedUntil) {
      setMessage("Select unlock date");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/savings/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: amount || 0,
          locked_until: lockedUntil,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Savings created!");
        navigate("/savings");
      } else {
        setMessage(data.error || "Failed to create savings");
      }
    } catch (err) {
      setMessage("Network error");
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
        {/* OPTIONAL INITIAL DEPOSIT */}
        <div>
          <label className="block mb-2 text-white/70">Initial Deposit (Optional)</label>
          <input
            type="number"
            className="w-full bg-[#1f2937] p-3 text-white rounded-md outline-none"
            placeholder="₦0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        {/* LOCK DATE */}
        <div>
          <label className="block mb-2 text-white/70">Unlock Date</label>
          <input
            type="date"
            className="w-full bg-[#1f2937] p-3 text-white rounded-md outline-none"
            value={lockedUntil}
            onChange={(e) => setLockedUntil(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-brightOrange text-deepBlue font-bold py-3 rounded-lg hover:bg-orange-400"
        >
          Create Savings
        </button>
      </form>
    </div>
  );
}

