import React, { useEffect, useState } from "react";
import { initNuban, getWallet } from "../api/payments";
import toast from "react-hot-toast";

export default function WalletBox() {
  const [loading, setLoading] = useState(false);
  const [wallet, setWallet] = useState(null);

  async function loadWallet() {
    try {
      const data = await getWallet();
      setWallet(data.wallet || null);
    } catch (e) {
      console.log("Wallet load error:", e);
    }
  }

  async function activateAccount() {
    setLoading(true);
    try {
      const data = await initNuban();
      toast.success("Virtual account activation in progress!");
      await loadWallet();
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Failed to activate account");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadWallet();
  }, []);

  return (
    <div className="bg-[#101725] text-white p-5 rounded-xl w-full max-w-lg">
      <h3 className="text-lg font-semibold mb-3">Wallet</h3>

      {wallet ? (
        <>
          <div className="mb-2">
            <span className="text-white/70 text-sm">Balance:</span>
            <div className="text-2xl font-bold">₦{wallet.balance}</div>
          </div>

          <div className="mb-3">
            <span className="text-white/70 text-sm">Status:</span>
            <span className="ml-1 text-green-400 text-sm">Active</span>
          </div>

          {wallet.nuban_account ? (
            <div className="bg-black/20 p-3 rounded-md">
              <div className="text-sm text-white/70">Virtual Account</div>
              <div className="font-semibold">
                {wallet.nuban_account.account_number}
              </div>
              <div className="text-sm text-white/50">
                {wallet.nuban_account.bank_name}
              </div>
            </div>
          ) : (
            <button
              disabled={loading}
              onClick={activateAccount}
              className="mt-2 bg-brightOrange text-deepBlue font-semibold px-4 py-2 rounded-md w-full"
            >
              {loading ? "Activating..." : "Activate Virtual Account"}
            </button>
          )}
        </>
      ) : (
        <div className="text-white/60 text-sm">Loading wallet...</div>
      )}
    </div>
  );
}

