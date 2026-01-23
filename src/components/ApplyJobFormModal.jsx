import React, { useState } from "react";
import { X } from "lucide-react";

export default function ApplyJobFormModal({ job, onClose, onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [cv, setCv] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !email) {
      alert("Name & Email are required.");
      return;
    }

    onSubmit({
      jobId: job.id,
      jobRole: job.role,
      name,
      email,
      message,
      cvFileName: cv?.name || null,
      appliedAt: new Date().toISOString(),
    });
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#0f121a] text-white rounded-xl w-full max-w-lg p-6 relative border border-white/10">
        
        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 text-white/60 hover:text-white">
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold mb-4">
          Apply for {job.role}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            className="bg-[#1a1d25] p-3 rounded-lg border border-white/10 outline-none"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            className="bg-[#1a1d25] p-3 rounded-lg border border-white/10 outline-none"
            placeholder="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <textarea
            className="bg-[#1a1d25] p-3 rounded-lg border border-white/10 outline-none"
            placeholder="Message (optional)"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setCv(e.target.files[0])}
            className="text-white text-sm"
          />

          <button
            type="submit"
            className="bg-brightOrange text-deepBlue font-semibold p-3 rounded-lg mt-2"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}

