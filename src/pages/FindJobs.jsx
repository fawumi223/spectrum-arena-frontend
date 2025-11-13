import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapPin, Briefcase, SlidersHorizontal, Search, ArrowRight } from "lucide-react";

export default function FindJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [skillLevel, setSkillLevel] = useState("");

  const baseURL = process.env.REACT_APP_API_BASE || "http://127.0.0.1:8000/api";

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const resp = await axios.get(`${baseURL}/jobs-sync/`);
      setJobs(resp.data.results || []);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase());
    const matchLocation = location ? job.location.toLowerCase().includes(location.toLowerCase()) : true;
    const matchType = jobType ? job.source.toLowerCase().includes(jobType.toLowerCase()) : true;
    const matchSkill = skillLevel ? job.description.toLowerCase().includes(skillLevel.toLowerCase()) : true;
    return matchSearch && matchLocation && matchType && matchSkill;
  });

  return (
    <div className="min-h-screen bg-[#0b173d] text-white px-6 py-10 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <h1 className="text-3xl font-bold text-center text-orange-400 mb-8">
          Available Jobs
        </h1>

        {/* FILTER BAR */}
        <div className="bg-[#0d1a45] p-5 rounded-2xl shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center bg-[#101d4f] rounded-lg px-3">
              <Search size={18} className="text-gray-400 mr-2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search job title or company..."
                className="bg-transparent w-full outline-none text-sm text-white placeholder-gray-400"
              />
            </div>
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-[#101d4f] text-sm text-white px-3 py-2 rounded-lg outline-none placeholder-gray-400"
            />
            <select
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              className="bg-[#101d4f] text-sm text-white px-3 py-2 rounded-lg outline-none"
            >
              <option value="">Job Source</option>
              <option value="Google">Google Jobs</option>
              <option value="Jobberman">Jobberman</option>
              <option value="Indeed">Indeed</option>
            </select>
            <select
              value={skillLevel}
              onChange={(e) => setSkillLevel(e.target.value)}
              className="bg-[#101d4f] text-sm text-white px-3 py-2 rounded-lg outline-none"
            >
              <option value="">Skill Level</option>
              <option value="junior">Junior</option>
              <option value="mid">Mid-Level</option>
              <option value="senior">Senior</option>
            </select>
          </div>
        </div>

        {/* JOB LIST */}
        {loading ? (
          <div className="text-center text-gray-400 mt-10">Loading jobs...</div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center text-gray-400 mt-10">
            No jobs found. Try adjusting your filters.
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {filteredJobs.map((job, idx) => (
              <div
                key={idx}
                className="bg-[#101d4f] border border-white/10 rounded-2xl p-5 shadow-md hover:shadow-lg transition-all hover:-translate-y-[2px]"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-white">{job.title}</h3>
                  <span className="text-orange-400 text-xs uppercase">{job.source}</span>
                </div>
                <p className="text-sm text-gray-300">{job.company}</p>
                <p className="text-xs text-gray-400 flex items-center mt-1">
                  <MapPin size={12} className="mr-1" /> {job.location || "Location not specified"}
                </p>
                <p className="text-sm text-gray-400 mt-3 line-clamp-2">{job.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <a
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition-all"
                  >
                    Apply Now
                  </a>
                  <button className="text-sm text-blue-400 flex items-center hover:text-blue-500">
                    Save <ArrowRight size={14} className="ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

