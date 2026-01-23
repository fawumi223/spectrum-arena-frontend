import React, { useState } from "react";
import { X, MapPin, Briefcase } from "lucide-react";
import ApplyJobFormModal from "./ApplyJobFormModal";
import { saveJobApplication } from "../services/jobApplicationService";

export default function JobDetailsModal({ job, onClose }) {
  const [showApply, setShowApply] = useState(false);

  if (!job) return null;

  function handleSubmitApplication(data) {
    saveJobApplication(data);
    alert("Application submitted successfully!");
    setShowApply(false);
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-[#111827] text-white w-full max-w-xl rounded-xl p-6 border border-white/10 relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white/70 hover:text-white"
        >
          <X size={20} />
        </button>

        {/* Title */}
        <h2 className="text-xl font-bold">{job.role}</h2>

        <p className="text-white/60 text-sm mt-1">{job.company}</p>

        {/* Location / Type */}
        <div className="flex items-center gap-3 text-white/60 text-xs mt-3">
          <span className="flex items-center gap-1">
            <MapPin size={12} /> {job.city}, {job.state}
          </span>
          <span className="flex items-center gap-1">
            <Briefcase size={12} /> {job.type}
          </span>
        </div>

        {/* Salary */}
        <p className="text-brightOrange font-semibold mt-4">{job.salary}</p>

        {/* Description */}
        <p className="text-white/70 text-sm mt-4 leading-relaxed">
          {job.description || "No detailed job description provided."}
        </p>

        {/* CTA Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#1a1d25] border border-white/10 text-sm"
          >
            Close
          </button>

          <button
            onClick={() => setShowApply(true)}
            className="px-4 py-2 rounded-lg text-sm bg-brightOrange text-deepBlue font-semibold hover:bg-orange-400 transition"
          >
            Apply Now
          </button>
        </div>
      </div>

      {/* Apply Form Modal */}
      {showApply && (
        <ApplyJobFormModal
          job={job}
          onClose={() => setShowApply(false)}
          onSubmit={handleSubmitApplication}
        />
      )}
    </div>
  );
}

