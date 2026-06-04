import React from "react";
import { MapPin, Briefcase, Users, Edit2, Trash2 } from "lucide-react";

export default function RecruiterJobList({ jobs }) {
  const getStatusStyles = (status) => {
    switch (status) {
      case "Active":
        return "text-green-500 bg-green-500/10 border-green-500/20";
      case "Draft":
        return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
      case "Closed":
        return "text-red-500 bg-red-500/10 border-red-500/20";
      default:
        return "text-neutral-400 bg-neutral-800 border-neutral-700";
    }
  };

  if (!jobs || jobs.length === 0) {
    return (
      <div className="bg-[#161616] border border-neutral-800 rounded-xl p-10 text-center flex flex-col items-center justify-center">
        <Briefcase className="w-12 h-12 text-neutral-600 mb-4" />
        <h3 className="text-lg font-medium text-white mb-2">No jobs posted yet</h3>
        <p className="text-sm text-neutral-400">Create your first job posting to start receiving applicants.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {jobs.map((job) => (
        <div 
          key={job.id} 
          className="bg-[#161616] border border-neutral-800 hover:border-neutral-700 transition-colors rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          {/* Job Details */}
          <div className="flex flex-col flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-semibold text-white">{job.title}</h3>
              <span className={`px-2.5 py-0.5 text-[10px] uppercase font-bold tracking-wider border rounded-full ${getStatusStyles(job.status)}`}>
                {job.status}
              </span>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-400">
              <div className="flex items-center gap-1.5">
                <Briefcase size={16} />
                {job.type}
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin size={16} />
                {job.location}
              </div>
              <div className="flex items-center gap-1.5">
                <Users size={16} />
                {job.applicants} Applicants
              </div>
              <div className="text-neutral-500 text-xs">
                Posted {job.postedDate}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 shrink-0 border-t border-neutral-800 md:border-none pt-4 md:pt-0 mt-2 md:mt-0">
            <button className="flex items-center gap-2 px-4 py-2 bg-[#222222] hover:bg-[#2A2A2A] text-neutral-300 rounded-lg text-sm font-medium transition-colors border border-neutral-800">
              <Edit2 size={16} />
              Edit
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg text-sm font-medium transition-colors border border-red-500/20">
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}