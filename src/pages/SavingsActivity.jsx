import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SavingsActivity() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [activity, setActivity] = useState([]);
  const [message, setMessage] = useState("");

  const BASE_URL =
    process.env.REACT_APP_API_BASE || "http://127.0.0.1:8000/api";

  // ---------------------------------
  // LOAD ALL SAVINGS TRANSACTIONS
  // ---------------------------------
  const loadActivity = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/savings/activity/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      const data = await res.json();

      if (res.ok) {
        setActivity(data);
      } else {
        setMessage(data.error || "Unable to load activity.");
      }
    } catch {
      setMessage("Network error.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadActivity();
  }, []);

  // ---------------------------------
  // LOADING
  // ---------------------------------
  if (loading) {
    return (
      <div className="min-h-screen bg-deepBlue text-white flex items-center justify-center">
        Loading activity…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-deepBlue text-white px-6 py-10">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-white/70 hover:text-white mb-8"
      >
        <ArrowLeft size={22} />
        Back
      </button>

      <h1 className="text-3xl font-bold mb-2">Savings Activity</h1>
      <p className="text-white/60 mb-8">
        Deposits & withdrawals history
      </p>

      {message && <p className="text-red-400 mb-6">{message}</p>}

      {/* NO TRANSACTIONS */}
      {activity.length === 0 && (
        <p className="text-center text-white/50 mt-16">
          No transactions yet.
        </p>
      )}

      {/* LIST */}
      <div className="space-y-4">
        {activity.map((item) => {
          const isDeposit = item.type === "deposit";

          return (
            <div
              key={item.id}
              className="bg-[#111827] p-4 rounded-xl border border-white/10 flex justify-between items-center"
            >
              {/* LEFT */}
              <div>
                <p
                  className={`font-bold ${
                    isDeposit ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {isDeposit ? "+" : "-"}₦
                  {Number(item.amount).toLocaleString()}
                </p>

                <p className="text-xs text-white/60 mt-1">
                  {new Date(item.timestamp).toLocaleString()}
                </p>
              </div>

              {/* RIGHT */}
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  isDeposit
                    ? "bg-green-400 text-deepBlue"
                    : "bg-red-400 text-deepBlue"
                }`}
              >
                {isDeposit ? "Deposit" : "Withdrawal"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

