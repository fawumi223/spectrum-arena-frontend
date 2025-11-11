import React, { useState } from "react";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE || "http://127.0.0.1:8000/api/",
  headers: { "Content-Type": "application/json" },
});

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

  const categories = ["Autos", "Finance", "Farming", "Logistics", "Technology", "Construction", "Healthcare"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const token = localStorage.getItem("token");
      await api.post("jobs/create/", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("✅ Job posted successfully!");
      setTimeout(() => navigate("/choice"), 1500);
    } catch (err) {
      setError(err?.response?.data?.message || "Job posting failed.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0A1F44] text-white flex flex-col items-center py-10 px-6">
      <div className="w-full max-w-2xl bg-[#0d0f14] rounded-xl p-8 shadow-lg relative">
        <button onClick={() => navigate("/choice")} className="absolute top-4 left-4 text-gray-400 hover:text-white">
          <ArrowLeft size={24} />
        </button>

        <h2 className="text-2xl font-bold text-center mb-6 text-brightOrange">Post a Job</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
            placeholder="Company Name"
            required
            className="p-3 rounded-md bg-[#0A1F44] border border-gray-600 focus:outline-none focus:border-brightOrange"
          />

          <input
            name="company_address"
            value={formData.company_address}
            onChange={handleChange}
            placeholder="Company Address"
            required
            className="p-3 rounded-md bg-[#0A1F44] border border-gray-600 focus:outline-none focus:border-brightOrange"
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="p-3 rounded-md bg-[#0A1F44] border border-gray-600 text-white"
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
            className="p-3 rounded-md bg-[#0A1F44] border border-gray-600 focus:outline-none focus:border-brightOrange"
          />

          <select
            name="job_type"
            value={formData.job_type}
            onChange={handleChange}
            className="p-3 rounded-md bg-[#0A1F44] border border-gray-600 text-white"
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
            className="p-3 rounded-md bg-[#0A1F44] border border-gray-600 focus:outline-none focus:border-brightOrange"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Job Description"
            rows={4}
            className="p-3 rounded-md bg-[#0A1F44] border border-gray-600 focus:outline-none focus:border-brightOrange"
          />

          <div className="flex gap-4 mt-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="plan_type"
                value="basic"
                checked={formData.plan_type === "basic"}
                onChange={handleChange}
              />
              Basic (₦0 — visible for 24hrs)
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="plan_type"
                value="premium"
                checked={formData.plan_type === "premium"}
                onChange={handleChange}
              />
              Premium (₦1,000 — visible for 7 days)
            </label>
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}
          {message && <div className="text-green-400 text-sm">{message}</div>}

          <button
            type="submit"
            disabled={loading}
            className="mt-3 bg-brightOrange text-deepBlue font-bold py-3 rounded-md hover:bg-orange-400 transition-all duration-300"
          >
            {loading ? "Posting..." : "Post Job"}
          </button>
        </form>
      </div>
    </div>
  );
}

