import React, { useState } from "react";
import FiltersBar from "./FiltersBar";
import JobCard from "./JobCard";

const sampleJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechBridge",
    industry: "Tech",
    location: "Lagos",
    experience: "Mid",
    type: "Full-time",
    remote: true,
    salary: "₦150k – ₦300k / month",
  },
  {
    id: 2,
    title: "Construction Supervisor",
    company: "BuildPro Ltd",
    industry: "Construction",
    location: "Abuja",
    experience: "Senior",
    type: "Contract",
    remote: false,
    salary: "₦200k – ₦250k / month",
  },
  {
    id: 3,
    title: "Graphics Designer",
    company: "BrandLab",
    industry: "Creative",
    location: "Remote",
    experience: "Junior",
    type: "Full-time",
    remote: true,
    salary: "₦120k – ₦180k / month",
  },
];

export default function JobsExplore() {
  const [filters, setFilters] = useState(null);

  function filterJobs() {
    if (!filters) return sampleJobs;

    return sampleJobs.filter((job) => {
      const matchesLocation = filters.location === "All Nigeria" || job.location.includes(filters.location);
      const matchesIndustry = filters.industry === "All" || job.industry === filters.industry;
      const matchesExperience = filters.experience === "Any" || job.experience === filters.experience;
      const matchesType = job.type.includes(filters.type); // Option A loose match

      return matchesLocation && matchesIndustry && matchesExperience && matchesType;
    });
  }

  return (
    <div className="mb-10">
      <FiltersBar onChange={setFilters} />

      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">Recommended for You</h2>
        <button className="text-sm text-brightOrange hover:underline">
          See all jobs →
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filterJobs().map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}

