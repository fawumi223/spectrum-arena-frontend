import React, { useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { Tv } from "lucide-react";

export default function CableTV() {

  const [provider, setProvider] = useState("dstv");
  const [decoder, setDecoder] = useState("");
  const [plan, setPlan] = useState("");

  function handlePayment() {
    alert(`Paying ${provider} subscription`);
  }

  return (
    <DashboardLayout>

      <div className="max-w-xl">

        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Tv size={22} />
          Cable TV Subscription
        </h1>

        <div className="bg-[#111827] border border-white/10 rounded-xl p-6 space-y-5">

          <div>
            <label className="text-sm text-white/60">Provider</label>

            <select
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
              className="w-full mt-1 bg-[#0B1220] border border-white/10 rounded-lg p-3"
            >
              <option value="dstv">DSTV</option>
              <option value="gotv">GOTV</option>
              <option value="startimes">Startimes</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-white/60">Decoder Number</label>

            <input
              value={decoder}
              onChange={(e) => setDecoder(e.target.value)}
              placeholder="Enter decoder number"
              className="w-full mt-1 bg-[#0B1220] border border-white/10 rounded-lg p-3"
            />
          </div>

          <div>
            <label className="text-sm text-white/60">Plan</label>

            <input
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              placeholder="Enter subscription plan"
              className="w-full mt-1 bg-[#0B1220] border border-white/10 rounded-lg p-3"
            />
          </div>

          <button
            onClick={handlePayment}
            className="w-full bg-brightOrange text-black font-semibold py-3 rounded-lg"
          >
            Pay Subscription
          </button>

        </div>

      </div>

    </DashboardLayout>
  );
}

