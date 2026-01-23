import React, { useEffect, useState } from "react";
import { getApplications } from "../services/jobApplicationService";
import BackButton from "../components/BackButton";

export default function CompanyApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    setApplications(getApplications());
  }, []);

  return (
    <div className="min-h-screen bg-[#0d1018] text-white px-6 py-10">
      <div className="max-w-4xl mx-auto">

        <BackButton />

        <h1 className="text-2xl font-bold mb-6 text-brightOrange">
          Job Applications
        </h1>

        {applications.length === 0 ? (
          <p className="text-white/60">No applications yet.</p>
        ) : (
          <div className="space-y-4">
            {applications.map((app, i) => (
              <div
                key={i}
                className="bg-[#111827] border border-white/10 p-4 rounded-xl shadow"
              >
                <h3 className="font-semibold text-white">{app.jobRole}</h3>

                <p className="text-white/70 text-sm">
                  {app.fullName} — {app.email}
                </p>

                <p className="text-white/50 text-xs mt-1">
                  {new Date(app.appliedAt).toLocaleString()}
                </p>

                {app.message && (
                  <p className="text-white/80 text-sm mt-3 leading-relaxed">
                    {app.message}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

