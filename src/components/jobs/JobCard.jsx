import React from "react";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function JobCard({ job }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/jobs/${job.id}`)}
      className="bg-[#111827] border border-white/10 rounded-xl p-4 cursor-pointer hover:bg-[#162033] transition flex flex-col gap-2"
    >
      {/* Title + Company */}
      <div>
        <div className="text-white font-semibold text-sm">{job.title}</div>
        <div className="text-white/60 text-xs">
          {job.company} • {job.industry}
        </div>
      </div>

      {/* Location */}
      <div className="flex items-center gap-1 text-white/60 text-xs">
        <MapPin size={12} /> {job.location}
      </div>

      {/* Salary */}
      {job.salary && (
        <div className="text-sm font-bold text-[#ffbf00]">
          {job.salary}
        </div>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-1">
        <Tag>{job.experience}</Tag>
        <Tag>{job.type}</Tag>
        {job.remote && <Tag>Remote</Tag>}
      </div>
    </div>
  );
}

function Tag({ children }) {
  return (
    <span className="text-xs px-2 py-1 bg-white/10 rounded-md text-white/70 border border-white/10">
      {children}
    </span>
  );
}

