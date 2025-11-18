import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Airtime() {
  const navigate = useNavigate();

  const [network, setNetwork] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const BASE_URL =
    process.env.REACT_APP_API_BASE || "http://127.0.0.1:8000/api";

  const submitAirtime = async () => {
    if (!network || !phone || !amount) {
      setMessage("Please fill all fields.");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/bills/airtime/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({
          network,
          phone,
          amount,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Airtime request submitted! (Pending Providus Gateway)");
      } else {
        setMessage(data.error || "Unable to submit request.");
      }
    } catch (err) {
      setMessage("Network error. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-deepBlue text-white px-6 py-10">
      {/* BACK */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-white/70 hover:text-white mb-8"
      >
        <ArrowLeft size={22} />
        <span>Back</span>
      </button>

      <h1 className="text-3xl font-bold mb-8">Buy Airtime</h1>

      <div className="bg-[#111827] p-6 rounded-xl border border-white/10 shadow-md max-w-md mx-auto">
        
        {/* Network */}
        <label className="text-sm text-white/70">Network</label>
        <select
          value={network}
          onChange={(e) => setNetwork(e.target.value)}
          className="w-full bg-[#1a1d25] p-3 rounded-md mb-4 text-white outline-none"
        >
          <option value="">Select Network</option>
          <option value="mtn">MTN</option>
          <option value="glo">Glo</option>
          <option value="airtel">Airtel</option>
          <option value="9mobile">9Mobile</option>
        </select>

        {/* Phone */}
        <label className="text-sm text-white/70">Phone Number</label>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="08012345678"
          className="w-full bg-[#1a1d25] p-3 rounded-md mb-4 text-white outline-none"
        />

        {/* Amount */}
        <label className="text-sm text-white/70">Amount (₦)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="100 - 5000"
          className="w-full bg-[#1a1d25] p-3 rounded-md mb-4 text-white outline-none"
        />

        {/* Submit */}
        <button
          onClick={submitAirtime}
          disabled={loading}
          className="bg-brightOrange text-deepBlue font-bold px-6 py-3 rounded-lg w-full hover:bg-orange-400"
        >
          {loading ? "Processing..." : "Buy Airtime"}
        </button>

        {/* Status Message */}
        {message && (
          <p className="mt-4 text-center text-white/80">{message}</p>
        )}
      </div>
    </div>
  );
}

