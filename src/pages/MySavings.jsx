import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

export default function MySavings() {
  const navigate = useNavigate();

  const [savings, setSavings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  const BASE_URL =
    process.env.REACT_APP_API_BASE || "http://127.0.0.1:8000/api";

  // -----------------------------------------
  // LOAD USER SAVINGS
  // -----------------------------------------
  const loadSavings = async () => {
    try {
      setLoading(true);
      setMessage(null);

      const token = localStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/savings/me/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      const data = await res.json();

      if (res.ok) {
        setSavings(data);
      } else {
        setMessage(data.error || "Unable to load savings.");
      }
    } catch (err) {
      setMessage("Network error. Try again.");
    }

    setLoading(false);
  };

  useEffect(() => {
    loadSavings();
  }, []);

  // -----------------------------------------
  // LOADING STATE
  // -----------------------------------------
  if (loading) {
    return (
      <div className="min-h-screen bg-deepBlue text-white flex items-center justify-center">
        Loading savings…
      </div>
    );
  }

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

      <h1 className="text-3xl font-bold mb-2">My Savings</h1>
      <p className="text-white/60 mb-10">Manage your savings & thrift account</p>

      {/* STATUS MESSAGE */}
      {message && (
        <p className="text-center text-red-400 mb-6">{message}</p>
      )}

      {/* IF NO SAVINGS YET */}
      {!savings && (
        <div className="text-center">
          <p className="text-white/60 mb-6">
            You have not created a savings plan yet.
          </p>
          <Link
            to="/savings/create"
            className="bg-brightOrange text-deepBlue font-bold px-6 py-3 rounded-lg shadow-md hover:bg-orange-400"
          >
            Create Savings Plan
          </Link>
        </div>
      )}

      {/* SAVINGS INFO */}
      {savings && (
        <div className="space-y-8">

          {/* BALANCE BOX */}
          <div className="bg-[#111827] p-6 rounded-xl border border-white/10 shadow-md">
            <h2 className="text-xl font-semibold">Total Savings</h2>
            <p className="text-4xl font-bold text-brightOrange mt-2">
              ₦{Number(savings.amount).toLocaleString()}
            </p>
          </div>

          {/* LOCK INFO */}
          <div className="bg-[#111827] p-6 rounded-xl border border-white/10 shadow-md">
            <p className="text-white/70">Unlock Date:</p>

            <p className="text-lg font-semibold mt-1">
              {new Date(savings.locked_until).toDateString()}
            </p>

            {new Date(savings.locked_until) > new Date() ? (
              <p className="text-red-400 mt-2 text-sm">
                🔒 Withdrawal is locked until the unlock date.
              </p>
            ) : (
              <p className="text-green-400 mt-2 text-sm">
                🔓 You can withdraw now.
              </p>
            )}
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4">

            <Link
              to="/savings/create"
              className="bg-[#1f2937] text-white px-6 py-3 rounded-lg border border-white/10 hover:bg-[#2a3548]"
            >
              Add More Savings
            </Link>

            <Link
              to={`/savings/withdraw/${savings.id}`}
              className="bg-brightOrange text-deepBlue font-bold px-6 py-3 rounded-lg hover:bg-orange-400"
            >
              Withdraw
            </Link>

            <Link
              to="/savings/activity"
              className="bg-[#1f2937] text-white px-6 py-3 rounded-lg border border-white/10 hover:bg-[#2a3548]"
            >
              View Activity
            </Link>

          </div>
        </div>
      )}
    </div>
  );
}

