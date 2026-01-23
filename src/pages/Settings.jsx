import React from "react";
import DashboardLayout from "../layout/DashboardLayout";

export default function Settings() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  function mockLanguageClick(lang) {
    alert(`${lang} Voice AI is not supported on web preview. Use mobile app.`);
  }

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Profile & Settings</h1>

      {/* PROFILE CARD */}
      <div className="bg-[#111827] border border-white/10 rounded-xl p-5 mb-6">
        <h2 className="text-lg font-semibold mb-3">Account Info</h2>
        <div className="space-y-1 text-sm">
          <p><span className="text-white/50">Name:</span> {user.full_name || "—"}</p>
          <p><span className="text-white/50">Phone:</span> {user.phone_number || "—"}</p>
          <p><span className="text-white/50">Role:</span> {user.role || "—"}</p>
        </div>
      </div>

      {/* MULTILINGUAL AI */}
      <div className="bg-[#111827] border border-white/10 rounded-xl p-5 mb-6">
        <h2 className="text-lg font-semibold mb-3">Multilingual Voice AI</h2>
        <p className="text-white/60 text-sm mb-3">
          Demo only — Full mobile optimization in production.
        </p>

        <div className="flex flex-wrap gap-2">
          {["English", "Yoruba", "Igbo", "Hausa", "French", "Portuguese"].map((lang) => (
            <button
              key={lang}
              onClick={() => mockLanguageClick(lang)}
              className="px-3 py-2 text-xs bg-white/10 border border-white/10 rounded-md font-medium text-white hover:bg-white/20 transition"
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* SECURITY */}
      <div className="bg-[#111827] border border-white/10 rounded-xl p-5">
        <h2 className="text-lg font-semibold mb-3">Security</h2>
        <button
          onClick={() => alert("Password reset flow coming soon.")}
          className="px-4 py-2 bg-brightOrange text-deepBlue rounded-md text-sm font-semibold"
        >
          Change Password
        </button>
      </div>
    </DashboardLayout>
  );
}

