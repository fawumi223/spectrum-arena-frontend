import React from "react";

export default function Analytics() {
  return (
    <div className="min-h-screen bg-deepBlue text-white px-6 md:px-12 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-8">
          Analytics Dashboard
        </h1>

        {/* METRICS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Metric title="Total Savings" value="₦ —" />
          <Metric title="Transactions" value="—" />
          <Metric title="Jobs Applied" value="—" />
          <Metric title="Artisans Contacted" value="—" />
        </div>

        {/* DEBIT CARD SECTION */}
        <div className="bg-black/20 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-2">
            Spectrum Debit Card
          </h2>

          <p className="text-white/70 mb-4">
            Get a Spectrum-branded debit card powered by our banking partner.
          </p>

          <button
            disabled
            className="bg-gray-600 text-gray-300 px-5 py-2 rounded-md cursor-not-allowed"
          >
            Order Spectrum Card (Coming Soon)
          </button>
        </div>
      </div>
    </div>
  );
}

function Metric({ title, value }) {
  return (
    <div className="bg-black/20 rounded-xl p-6">
      <div className="text-sm text-white/60">{title}</div>
      <div className="text-2xl font-bold mt-2">{value}</div>
    </div>
  );
}

