import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function JobProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  const BASE_URL = process.env.REACT_APP_API_BASE || "http://127.0.0.1:8000/api";

  // ----------------------------
  // AUTH CHECK
  // ----------------------------
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/"); // redirect to login/landing
  }, [navigate]);

  // ----------------------------
  // FETCH JOB DETAILS
  // ----------------------------
  const fetchJob = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/jobs/${id}/`);
      const data = await res.json();

      setJob(data);
      setLoading(false);
    } catch (error) {
      console.log("Job detail load error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJob();
  }, [id]);

  // ----------------------------
  // LOADING SCREEN
  // ----------------------------
  if (loading) {
    return (
      <div className="min-h-screen bg-deepBlue text-white flex items-center justify-center text-lg">
        Loading job…
      </div>
    );
  }

  // ----------------------------
  // IF JOB NOT FOUND
  // ----------------------------
  if (!job) {
    return (
      <div className="min-h-screen bg-deepBlue text-white flex items-center justify-center text-lg">
        Job not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-deepBlue text-white px-6 py-10">
      <div className="max-w-3xl mx-auto">

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-brightOrange font-semibold hover:text-orange-300"
        >
          ← Back
        </button>

        {/* TITLE */}
        <h1 className="text-3xl font-bold mb-2">{job.title}</h1>

        {/* SKILL */}
        <p className="text-white/70 text-lg mb-4">{job.skill}</p>

        {/* LOCATION */}
        <p className="text-white/40 text-sm mb-6">
          {job.address}, {job.city}, {job.state}
        </p>

        {/* DESCRIPTION */}
        <div className="bg-[#111827] p-5 rounded-xl border border-white/10 mb-8">
          <h2 className="text-xl font-semibold mb-2">Job Description</h2>
          <p className="text-white/70">{job.description}</p>
        </div>

        {/* AUTO MATCHED ARTISANS */}
        <div className="bg-[#111827] p-5 rounded-xl border border-white/10 mb-10">
          <h2 className="text-xl font-semibold mb-4 text-brightOrange">
            Auto-matched Artisans
          </h2>

          {job.matched_artisans?.length === 0 && (
            <p className="text-white/50">No nearby artisans match this job.</p>
          )}

          <div className="space-y-4">
            {job.matched_artisans?.map((a) => (
              <div
                key={a.id}
                className="p-4 bg-[#1a1d25] rounded-lg border border-white/10 hover:border-brightOrange transition"
              >
                <div className="flex items-center gap-4">

                  {/* Artisan Image */}
                  <img
                    src={a.image || "/placeholder-user.png"}
                    alt={a.full_name}
                    className="h-16 w-16 rounded-lg object-cover"
                  />

                  {/* Text */}
                  <div>
                    <h3 className="text-lg font-semibold">{a.full_name}</h3>
                    <p className="text-white/60 text-sm">{a.skill}</p>
                    {a.distance && (
                      <p className="text-white/40 text-sm mt-1">
                        {a.distance.toFixed(1)} meters away
                      </p>
                    )}
                  </div>
                </div>

                {/* HIRE BUTTON */}
                <button
                  onClick={() => navigate(`/hire/${a.id}?job=${job.id}`)}
                  className="mt-4 bg-brightOrange text-deepBlue font-semibold px-4 py-2 rounded-md hover:bg-orange-400 transition"
                >
                  Hire Artisan
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* APPLY BUTTON */}
        <button className="w-full bg-brightOrange text-deepBlue font-semibold px-4 py-3 rounded-md hover:bg-orange-400 transition">
          Apply For Job
        </button>
      </div>
    </div>
  );
}

