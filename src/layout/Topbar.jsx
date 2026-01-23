import React from "react";

export default function Topbar() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const firstName = user.full_name ? user.full_name.split(" ")[0] : "User";

  return (
    <div className="w-full bg-[#0f131c] border-b border-white/10 px-5 md:px-10 py-4 flex items-center justify-between">
      {/* Search box */}
      <input
        type="text"
        placeholder="Search jobs, artisans, utilities..."
        className="w-full max-w-md bg-black/20 text-white placeholder-white/40 px-4 py-2 rounded-md"
      />

      {/* Profile circle */}
      <div className="ml-4 flex items-center gap-3">
        <span className="hidden md:block text-white/70 text-sm">
          Hello, {firstName}
        </span>
        <div className="h-9 w-9 rounded-full bg-brightOrange flex items-center justify-center text-black font-bold">
          {firstName.charAt(0).toUpperCase()}
        </div>
      </div>
    </div>
  );
}

