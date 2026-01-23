import React from "react";

export default function StatusModal({
  open,
  type = "success", // success | error
  title,
  message,
  onClose,
}) {
  if (!open) return null;

  const isSuccess = type === "success";

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#111827] w-[90%] max-w-md rounded-xl p-6 border border-white/10">
        <h2
          className={`text-2xl font-bold mb-3 ${
            isSuccess ? "text-green-400" : "text-red-400"
          }`}
        >
          {title}
        </h2>

        <p className="text-white/70 mb-6">{message}</p>

        <button
          onClick={onClose}
          className={`w-full py-3 rounded-lg font-semibold ${
            isSuccess
              ? "bg-green-400 text-deepBlue hover:bg-green-300"
              : "bg-red-400 text-deepBlue hover:bg-red-300"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

