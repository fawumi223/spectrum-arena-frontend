import React from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";

export default function JobDetail() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-[#0d1018] text-white px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <BackButton />

        <h1 className="text-2xl font-bold mt-4 mb-2">
          Job Details (Job ID: {id})
        </h1>

        <p className="text-white/70 text-sm mb-6">
          Full job details will load here when backend REST is connected.
        </p>

        <div className="bg-[#111827] border border-white/10 p-4 rounded-xl">
          <p className="text-white/60 text-sm">
            This is a placeholder view. Once backend endpoints are ready,
            this page will show role, company, salary, location, description
            and apply information.
          </p>
        </div>
      </div>
    </div>
  );
}

