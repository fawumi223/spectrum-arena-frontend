import React, { useState } from "react";
import BackButton from "../components/BackButton";

export default function MySavings() {
  // Temporary demo state (until backend is fully wired)
  const [walletBalance] = useState(0);
  const [savingsBalance] = useState(0);

  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);

  return (
    <div className="min-h-screen bg-deepBlue text-white px-6 py-10">
      <div className="max-w-xl mx-auto">

        <BackButton />

        <h1 className="text-3xl font-bold mb-2">My Savings</h1>
        <p className="text-white/60 mb-10">
          Manage your savings & wallet balances
        </p>

        {/* BALANCE BOX */}
        <div className="bg-[#111827] border border-white/10 p-6 rounded-xl shadow mb-8">
          <div className="mb-6">
            <p className="text-white/60 text-sm">Wallet Balance</p>
            <p className="text-3xl font-bold">
              ₦{walletBalance.toLocaleString()}
            </p>
          </div>

          <div className="border-t border-white/10 my-4" />

          <div>
            <p className="text-white/60 text-sm">Savings Balance</p>
            <p className="text-3xl font-bold">
              ₦{savingsBalance.toLocaleString()}
            </p>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col gap-3 mb-6">
          <button
            onClick={() => setShowDeposit(true)}
            className="bg-brightOrange text-deepBlue px-4 py-3 rounded-lg font-semibold"
          >
            Deposit
          </button>

          <button
            onClick={() => setShowWithdraw(true)}
            className="bg-[#1a1d25] border border-white/10 px-4 py-3 rounded-lg font-semibold"
          >
            Withdraw
          </button>

          <button
            onClick={() => alert('Transactions coming soon')}
            className="bg-[#1a1d25] border border-white/10 px-4 py-3 rounded-lg font-semibold"
          >
            View Transactions
          </button>
        </div>

        {/* DEPOSIT MODAL */}
        {showDeposit && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-[#111827] p-6 rounded-xl w-full max-w-sm text-white">
              <h2 className="text-lg font-semibold mb-4">
                Deposit Methods
              </h2>

              <button
                disabled
                className="w-full bg-[#1a1d25] border border-white/10 px-4 py-3 rounded-lg mb-3 opacity-50 cursor-not-allowed"
              >
                Pay with Debit Card (Coming Soon)
              </button>

              <button
                disabled
                className="w-full bg-[#1a1d25] border border-white/10 px-4 py-3 rounded-lg mb-3 opacity-50 cursor-not-allowed"
              >
                Fund via Bank Transfer (Coming Soon)
              </button>

              <button
                onClick={() => setShowDeposit(false)}
                className="w-full bg-brightOrange text-deepBlue py-3 rounded-lg font-semibold mt-2"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* WITHDRAW MODAL */}
        {showWithdraw && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-[#111827] p-6 rounded-xl w-full max-w-sm text-white">
              <h2 className="text-lg font-semibold mb-4">
                Withdraw Funds
              </h2>

              {savingsBalance <= 0 ? (
                <p className="text-white/70 mb-4 text-sm">
                  You need to have savings before you can withdraw.
                </p>
              ) : (
                <p className="text-white/70 mb-4 text-sm">
                  Withdrawal options will appear here.
                </p>
              )}

              <button
                onClick={() => setShowWithdraw(false)}
                className="w-full bg-brightOrange text-deepBlue py-3 rounded-lg font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

