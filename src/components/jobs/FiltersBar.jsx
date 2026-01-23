import React, { useState } from "react";
import { ChevronDown, Filter, MapPin, FolderKanban } from "lucide-react";

export default function FiltersBar({ onChange }) {
  const [location, setLocation] = useState("All Nigeria");
  const [experience, setExperience] = useState("Any");
  const [industry, setIndustry] = useState("All");
  const [type, setType] = useState("Full-time"); // normalized field name

  function applyFilters(extra = {}) {
    onChange?.({
      location,
      experience,
      industry,
      type,
      ...extra,
    });
  }

  return (
    <div className="w-full bg-[#111827] border border-white/10 rounded-xl p-4 flex flex-col gap-3 mb-6">

      {/* Pills */}
      <div className="flex flex-wrap gap-2">
        {["Remote", "Hybrid", "On-site", "Urgent"].map((pill) => (
          <button
            key={pill}
            onClick={() => applyFilters({ mode: pill.toLowerCase() })}
            className="px-3 py-1 text-xs rounded-md border border-white/10 bg-white/5 hover:bg-white/10 text-white/70"
          >
            {pill}
          </button>
        ))}
      </div>

      {/* Dropdown Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <Dropdown
          icon={<MapPin size={14} />}
          label="Location"
          value={location}
          onChange={setLocation}
          options={["All Nigeria", "Lagos", "Abuja", "Port Harcourt", "Remote"]}
        />

        <Dropdown
          icon={<FolderKanban size={14} />}
          label="Experience"
          value={experience}
          onChange={setExperience}
          options={["Any", "Junior", "Mid", "Senior", "Lead"]}
        />

        <Dropdown
          icon={<Filter size={14} />}
          label="Industry"
          value={industry}
          onChange={setIndustry}
          options={["All", "Tech", "Construction", "Creative", "Logistics", "Finance"]}
        />

        <Dropdown
          icon={<ChevronDown size={14} />}
          label="Job Type"
          value={type}
          onChange={setType}
          options={["Full-time", "Part-time", "Contract", "Internship"]}
        />
      </div>

      <button
        onClick={() => applyFilters()}
        className="mt-2 w-full bg-brightOrange text-deepBlue font-semibold py-2 rounded-md"
      >
        Apply Filters
      </button>
    </div>
  );
}

function Dropdown({ label, value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-black/20 border border-white/10 rounded-md px-3 py-2 text-sm text-white"
    >
      {options.map((opt) => (
        <option key={opt} value={opt} className="text-black">
          {opt}
        </option>
      ))}
    </select>
  );
}

