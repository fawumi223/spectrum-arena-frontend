```javascript
import React, { useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { Ticket } from "lucide-react";

export default function BetVouchers() {
  const [provider, setProvider] = useState("bet9ja");
  const [amount, setAmount] = useState("");

  function handlePurchase() {
    alert(`Buying ₦${amount} voucher for ${provider}`);
  }

  return (
    <DashboardLayout>

      <div className="max-w-xl">

        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Ticket size={22} /> Bet Voucher
        </h1>

        <div className="bg-[#111827] border border-white/10 rounded-xl p-6 space-y-5">

          {/* PROVIDER */}
          <div>
            <label className="text-sm text-white/60">Bet Provider</label>

            <select
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
              className="w-full mt-1 bg-[#0B1220] border border-white/10 rounded-lg p-3"
            >
              <option value="bet9ja">Bet9ja</option>
              <option value="sporty">SportyBet</option>
              <option value="betking">BetKing</option>
              <option value="1xbet">1xBet</option>
            </select>
          </div>

          {/* AMOUNT */}
          <div>
            <label className="text-sm text-white/60">Voucher Amount</label>

            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full mt-1 bg-[#0B1220] border border-white/10 rounded-lg p-3"
            />
          </div>

          {/* BUY BUTTON */}
          <button
            onClick={handlePurchase}
            className="w-full bg-brightOrange text-black font-semibold py-3 rounded-lg"
          >
            Buy Voucher
          </button>

        </div>

      </div>

    </DashboardLayout>
  );
}
```

