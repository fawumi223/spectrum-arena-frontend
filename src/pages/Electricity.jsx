import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Electricity() {
  const navigate = useNavigate();

  const [disco, setDisco] = useState("");
  const [meterType, setMeterType] = useState("");
  const [meterNumber, setMeterNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const BASE_URL =
    process.env.REACT_APP_API_BASE || "http://127.0.0.1:8000/api";

  const submitElectricityPayment = async () => {
    if (!disco || !meterType || !meterNumber || !amount) {
      setMessage("All fields are required.");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/bills/electricity/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({
          disco,
          meter_type: meterType,
          meter_number: meterNumber,
          amount,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(
          "Electricity bill payment request submitted! (Pending Providus Gateway)"
        );
      } else {
        setMessage(data.error || "Unable to submit electricity payment.");
      }
    } catch (err) {
      setMessage("Network error. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-deepBlue text-white px-6 py-10">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-white/70 hover:text-white mb-8"
      >
        <ArrowLeft size={22} />
        <span>Back</span>
      </button>

      <h1 className="text-3xl font-bold mb-8">Electricity Payment</h1>

      <div className="bg-[#111827] p-6 rounded-xl border border-white/10 shadow-md max-w-md mx-auto">

        {/* DISCO */}
        <label className="text-sm text-white/70">Electricity Provider (DISCO)</label>
        <select
          value={disco}
          onChange={(e) => setDisco(e.target.value)}
          className="w-full bg-[#1a1d25] p-3 rounded-md mb-4 text-white outline-none"
        >
          <option value="">Select DISCO</option>
          <option value="ikeja">Ikeja Electric</option>
          <option value="eko">Eko Electric</option>
          <option value="kano">KEDCO</option>
          <option value="kaduna">KAEDCO</option>
          <option value="abuja">AEDC</option>
          <option value="ibadan">IBEDC</option>
          <option value="jos">JED</option>
          <option value="enugu">EEDC</option>
          <option value="portharcourt">PHED</option>
        </select>

        {/* METER TYPE */}
        <label className="text-sm text-white/70">Meter Type</label>
        <select
          value={meterType}
          onChange={(e) => setMeterType(e.target.value)}
          className="w-full bg-[#1a1d25] p-3 rounded-md mb-4 text-white outline-none"
        >
          <option value="">Select Meter Type</option>
          <option value="prepaid">Prepaid</option>
          <option value="postpaid">Postpaid</option>
        </select>

        {/* METER NUMBER */}
        <label className="text-sm text-white/70">Meter Number</label>
        <input
          value={meterNumber}
          onChange={(e) => setMeterNumber(e.target.value)}
          placeholder="Enter meter number"
          className="w-full bg-[#1a1d25] p-3 rounded-md mb-4 text-white outline-none"
        />

        {/* AMOUNT */}
        <label className="text-sm text-white/70">Amount (₦)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="w-full bg-[#1a1d25] p-3 rounded-md mb-4 text-white outline-none"
        />

        {/* SUBMIT BUTTON */}
        <button
          onClick={submitElectricityPayment}
          disabled={loading}
          className="bg-brightOrange text-deepBlue font-bold px-6 py-3 rounded-lg w-full hover:bg-orange-400"
        >
          {loading ? "Processing..." : "Pay Electricity"}
        </button>

        {/* MESSAGE */}
        {message && (
          <p className="mt-4 text-center text-white/80">{message}</p>
        )}
      </div>
    </div>
  );
}

