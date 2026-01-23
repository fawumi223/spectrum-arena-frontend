import React, { useEffect, useState } from "react";
import mockInternalJobs from "../mocks/mockInternalJobs";
import JobDetailsModal from "../components/JobDetailsModal";
import { Search, MapPin, ArrowRight } from "lucide-react";
import BackButton from "../components/BackButton";

export default function FindJobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [state, setState] = useState("");
  const [selectedJob, setSelectedJob] = useState(null); // <-- Modal state

  // Load mock jobs
  useEffect(() => {
    setJobs(mockInternalJobs);
  }, []);

  // Filters
  const filtered = jobs.filter((job) => {
    const matchSearch =
      job.role.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase());

    const matchType = type ? job.type === type : true;
    const matchState = state ? job.state === state : true;

    return matchSearch && matchType && matchState;
  });

return (
  <div className="min-h-screen bg-[#0d1018] text-white px-6 py-10">
    <div className="max-w-5xl mx-auto">
      
      <BackButton />

      <h1 className="text-3xl font-bold mb-6 text-center text-brightOrange">
        Job Opportunities
      </h1>

      {/* FILTER BAR */}
      <div className="bg-[#111827] border border-white/10 rounded-xl p-5 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Search */}
          <div className="flex items-center bg-[#1a1d25] rounded-lg px-3">
            <Search size={18} className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search role or company..."
              className="bg-transparent flex-1 text-sm outline-none text-white placeholder-gray-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Job Type */}
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="bg-[#1f2937] p-3 rounded-lg border border-white/10 outline-none"
          >
            <option value="">All Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Remote">Remote</option>
            <option value="Part-time">Part-time</option>
          </select>

          {/* State */}
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="bg-[#1f2937] p-3 rounded-lg border border-white/10 outline-none"
          >
            <option value="">All States</option>
            <option value="Lagos">Lagos</option>
            <option value="Abuja">Abuja</option>
            <option value="Port Harcourt">Port Harcourt</option>
          </select>
        </div>
      </div>
        {/* JOB LIST */}
        {filtered.length === 0 ? (
          <div className="text-center text-white/60 mt-10">No jobs found.</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {filtered.map((job) => (
              <div
                key={job.id}
                className="bg-[#111827] border border-white/10 rounded-xl p-5 hover:border-brightOrange transition"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-white">{job.role}</h3>
                  <span className="text-xs px-2 py-1 rounded-md bg-brightOrange text-deepBlue">
                    {job.type}
                  </span>
                </div>

                <p className="text-white/70 text-sm">{job.company}</p>

                <div className="flex items-center text-white/60 text-xs mt-2">
                  <MapPin size={12} className="mr-1" /> {job.city}, {job.state}
                </div>

                <div className="text-brightOrange font-semibold mt-3">
                  {job.salary}
                </div>

                <p className="text-white/50 text-sm mt-2 line-clamp-2">
                  {job.description}
                </p>

                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => setSelectedJob(job)}
                    className="text-sm text-blue-400 flex items-center hover:text-blue-300"
                  >
                    View Details <ArrowRight size={14} className="ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* JOB DETAILS MODAL */}
        {selectedJob && (
          <JobDetailsModal
            job={selectedJob}
            onClose={() => setSelectedJob(null)}
          />
        )}
      </div>
    </div>
  );
}

