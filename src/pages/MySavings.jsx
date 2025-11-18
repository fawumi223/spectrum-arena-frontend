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
  // FETCH SAVINGS INFO
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
  // RENDER
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

      {/* NO SAVINGS CREATED */}
      {!savings && (
        <div className="text-center">
          <p className="text-white/60 mb-6">You have not created a savings plan yet.</p>
          <Link
            to="/savings/create"
            className="bg-brightOrange text-deepBlue font-bold px-6 py-3 rounded-lg inline-block"
          >
            Create Savings Plan
          </Link>
        </div>
      )}

      {/* SAVINGS SUMMARY */}
      {savings && (
        <div className="space-y-8">

          {/* BALANCE BOX */}
          <div className="bg-[#111827] p-6 rounded-xl border border-white/10 shadow-md">
            <h2 className="text-xl font-semibold">Total Savings</h2>
            <p className="text-4xl font-bold text-brightOrange mt-2">
              ₦{Number(savings.amount).toLocaleString()}
            </p>
          </div>

          {/* UNLOCK INFO */}
          <div className="bg-[#111827] p-6 rounded-xl border border-white/10 shadow-md">
            <p className="text-white/70">Unlock Date:</p>
            <p className="text-lg font-semibold mt-1">
              {new Date(savings.unlock_date).toDateString()}
            </p>

            {new Date(savings.unlock_date) > new Date() ? (
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
          <div className="flex gap-4">
            <Link
              to="/savings/create"
              className="bg-[#1f2937] text-white px-6 py-3 rounded-lg border border-white/20 flex-1 text-center"
            >
              Add More Savings
            </Link>

            <Link
              to={`/savings/withdraw/${savings.id}`}
              className="bg-brightOrange text-deepBlue font-bold px-6 py-3 rounded-lg flex-1 text-center"
            >
              Withdraw
            </Link>
          </div>

          {/* TRANSACTION HISTORY (PHASE 2) */}
          <div className="mt-10 bg-[#111827] p-6 rounded-xl border border-white/10">
            <h2 className="text-xl font-semibold mb-4">Activity</h2>

            {(!savings.history || savings.history.length === 0) && (
              <p className="text-white/60">No activity recorded yet.</p>
            )}

            {savings.history && savings.history.length > 0 && (
              <div className="space-y-4">
                {savings.history.map((item, i) => (
                  <div key={i} className="border-b border-white/10 pb-3">
                    <p className="font-semibold">
                      {item.type === "deposit" ? "Deposit" : "Withdrawal"}
                    </p>
                    <p className="text-white/60">
                      ₦{Number(item.amount).toLocaleString()}
                    </p>
                    <p className="text-xs text-white/40">
                      {new Date(item.date).toDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

