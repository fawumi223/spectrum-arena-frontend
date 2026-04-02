import React, { useEffect, useState } from "react";
import { initNuban, getWallet } from "../api/payments";
import toast from "react-hot-toast";

export default function WalletBox() {
  const [loading, setLoading] = useState(false);
  const [wallet, setWallet] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    loadWallet();
  }, []);

  async function loadWallet() {
    try {
      const data = await getWallet();
      setWallet(data);
      setError("");
    } catch (e) {
      console.log("Wallet load error:", e);
      setError("Failed to load wallet");
    }
  }

  async function activateAccount() {
    setLoading(true);
    try {
      await initNuban();
      toast.success("Virtual account activation in progress!");
      await loadWallet();
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Failed to activate account");
    } finally {
      setLoading(false);
    }
  }

  function formatMoney(amount) {
    if (!amount && amount !== 0) return "--";
    return `₦${Number(amount).toLocaleString()}`;
  }

  return (
    <div className="bg-gradient-to-br from-[#0f172a] to-[#020617] text-white p-5 rounded-2xl w-full shadow-xl border border-white/10">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4 text-sm text-gray-400">
        <span>Wallet Balance</span>
        <span>NGN</span>
      </div>

      {/* BALANCE */}
      <div className="text-3xl font-bold mb-4">

        {!wallet && !error && (
          <div className="animate-pulse h-8 w-32 bg-gray-700 rounded" />
        )}

        {error && (
          <span className="text-red-400 text-sm">{error}</span>
        )}

        {wallet && !error && formatMoney(wallet.balance)}

      </div>

      {/* ACTIONS */}
      <div className="grid grid-cols-3 gap-3 mb-5">

        <button className="bg-orange-500 hover:opacity-90 rounded-lg py-2 text-sm font-semibold">
          Fund
        </button>

        <button className="bg-[#111827] hover:bg-[#1e293b] rounded-lg py-2 text-sm">
          Withdraw
        </button>

        <button className="bg-[#111827] hover:bg-[#1e293b] rounded-lg py-2 text-sm">
          Transfer
        </button>

      </div>

      {/* VIRTUAL ACCOUNT */}
      {wallet && wallet.nuban_account ? (
        <div className="bg-black/30 p-3 rounded-xl border border-white/10">

          <div className="text-xs text-gray-400 mb-1">
            Virtual Account
          </div>

          <div className="text-lg font-semibold tracking-wider">
            {wallet.nuban_account.account_number}
          </div>

          <div className="text-xs text-gray-500">
            {wallet.nuban_account.bank_name}
          </div>

        </div>
      ) : wallet ? (
        <button
          disabled={loading}
          onClick={activateAccount}
          className="w-full mt-2 bg-orange-500 hover:opacity-90 text-[#020617] font-semibold py-3 rounded-xl"
        >
          {loading ? "Activating..." : "Activate Virtual Account"}
        </button>
      ) : null}

    </div>
  );
}
