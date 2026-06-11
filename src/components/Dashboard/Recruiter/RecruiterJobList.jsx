import React from "react";
import { MapPin, Briefcase, DollarSign, Edit2, Trash2 } from "lucide-react";
import JobCard from "./JobCard";

export default function RecruiterJobList({ jobs }) {
  const getStatusStyles = (status) => {
    switch (status) {
      case "active":
        return "text-green-500 bg-green-500/10 border-green-500/20";
      case "draft":
        return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
      case "closed":
        return "text-red-500 bg-red-500/10 border-red-500/20";
      default:
        return "text-neutral-400 bg-neutral-800 border-neutral-700";
    }
  };

  if (!jobs || jobs.length === 0) {
    return (
      <div className="bg-[#161616] border border-neutral-800 rounded-xl p-10 text-center flex flex-col items-center justify-center">
        <Briefcase className="w-12 h-12 text-neutral-600 mb-4" />
        <h3 className="text-lg font-medium text-white mb-2">
          No jobs posted yet
        </h3>
        <p className="text-sm text-neutral-400">
          Create your first job posting to start receiving applicants.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {jobs.map((job) => (
        <JobCard key={job._id} job={job} getStatusStyles={getStatusStyles} />
      ))}
    </div>
  );
}
