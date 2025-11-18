import React, { useEffect, useState } from "react";

export default function JobStats() {
  const [stats, setStats] = useState(null);
  const [minutesAgo, setMinutesAgo] = useState("");

  const BASE = process.env.REACT_APP_API_BASE || "http://127.0.0.1:8000/api";

  async function loadStats() {
    const res = await fetch(`${BASE}/jobs-sync/stats/`);
    const data = await res.json();
    setStats(data);

    if (data.last_sync) {
      const last = new Date(data.last_sync);
      const diffMs = Date.now() - last.getTime();
      const mins = Math.round(diffMs / 60000);
      setMinutesAgo(`${mins} min ago`);
    }
  }

  useEffect(() => {
    loadStats();

    // Auto-refresh every 5 minutes
    const interval = setInterval(loadStats, 300000);

    return () => clearInterval(interval);
  }, []);

  if (!stats) return null;

  return (
    <div className="bg-[#101d4f] p-4 rounded-xl border border-white/10 shadow-md mb-5">
      <h3 className="text-lg font-semibold text-orange-400">Job Sync Status</h3>

      <p className="text-white/80 mt-2">
        Today fetched: <strong>{stats.today_jobs}</strong>
      </p>

      <p className="text-white/80">
        Last sync: <strong>{minutesAgo}</strong>
      </p>

      <p className="text-white/80">
        Total stored: <strong>{stats.total_jobs}</strong>
      </p>
    </div>
  );
}

