import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import api from "../api/api"; // <-- use our existing axios instance

export default function PostJob() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    company_name: "",
    company_address: "",
    category: "",
    role: "",
    job_type: "Full-Time",
    salary_range: "",
    description: "",
    plan_type: "basic",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const categories = [
    "Autos",
    "Finance",
    "Farming",
    "Logistics",
    "Technology",
    "Construction",
    "Healthcare",
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const token = localStorage.getItem("access"); // <-- correct token
      await api.post(
        "jobs/create/",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage("Job posted successfully!");
      setTimeout(() => navigate("/dashboard"), 1200);
    } catch (err) {
      setError(err?.response?.data?.message || "Job posting failed.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0d1018] text-white px-6 py-10">
      <div className="max-w-2xl mx-auto bg-[#111827] p-8 rounded-xl border border-white/10">
        
        <BackButton />

        <h2 className="text-2xl font-bold mb-6 text-center text-brightOrange">
          Post a Job
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
            placeholder="Company Name"
            required
            className="p-3 rounded-md bg-[#1f2937] border border-white/10 outline-none"
          />

          <input
            name="company_address"
            value={formData.company_address}
            onChange={handleChange}
            placeholder="Company Address"
            required
            className="p-3 rounded-md bg-[#1f2937] border border-white/10 outline-none"
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="p-3 rounded-md bg-[#1f2937] border border-white/10 outline-none"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <input
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Job Role / Specialization"
            required
            className="p-3 rounded-md bg-[#1f2937] border border-white/10 outline-none"
          />

          <select
            name="job_type"
            value={formData.job_type}
            onChange={handleChange}
            className="p-3 rounded-md bg-[#1f2937] border border-white/10 outline-none"
          >
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Contract">Contract</option>
          </select>

          <input
            name="salary_range"
            value={formData.salary_range}
            onChange={handleChange}
            placeholder="Salary Range (₦ e.g., 150000 - 250000)"
            className="p-3 rounded-md bg-[#1f2937] border border-white/10 outline-none"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Job Description"
            rows={4}
            className="p-3 rounded-md bg-[#1f2937] border border-white/10 outline-none"
          />

          <div className="flex flex-col gap-2 mt-2 text-sm">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="plan_type"
                value="basic"
                checked={formData.plan_type === "basic"}
                onChange={handleChange}
              />
              <span>Basic (₦0 — visible for 24hrs)</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="plan_type"
                value="premium"
                checked={formData.plan_type === "premium"}
                onChange={handleChange}
              />
              <span>Premium (₦1,000 — visible for 7 days)</span>
            </label>
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}
          {message && <div className="text-green-400 text-sm">{message}</div>}

          <button
            type="submit"
            disabled={loading}
            className="mt-3 bg-brightOrange text-deepBlue font-bold py-3 rounded-md disabled:opacity-50"
          >
            {loading ? "Posting..." : "Post Job"}
          </button>
        </form>
      </div>
    </div>
  );
}

