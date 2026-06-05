import { Briefcase, MapPin, DollarSign, Edit2, Trash2 } from "lucide-react";
import JobDeleteAlert from "./JobDeleteAlert";

export default function JobCard({ job, getStatusStyles }) {
  const locationDisplay = job.isRemote
    ? "Remote"
    : `${job.city}, ${job.country}`;
  const currentStatus = job.status || "Active";

  return (
    <div className="bg-[#161616] border border-neutral-800 hover:border-neutral-700 transition-colors rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
      {/* Job Details */}
      <div className="flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-2">
          <h3 className="text-lg font-semibold text-white">{job.jobTitle}</h3>
          <span
            className={`px-2.5 py-0.5 text-[10px] uppercase font-bold tracking-wider border rounded-full ${getStatusStyles(currentStatus)}`}
          >
            {currentStatus}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-400">
          <div className="flex items-center gap-1.5">
            <Briefcase size={16} />
            {job.jobType}
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin size={16} />
            {locationDisplay}
          </div>
          <div className="flex items-center gap-1.5">
            <DollarSign size={16} />
            {job.minSalary} - {job.maxSalary} {job.currency}
          </div>
          <div className="text-neutral-500 text-xs">
            Posted {job.postedDate} • Deadline: {job.deadline}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 shrink-0 border-t border-neutral-800 md:border-none pt-4 md:pt-0 mt-2 md:mt-0">
        <button className="flex items-center gap-2 px-4 py-2 bg-[#222222] hover:bg-[#2A2A2A] text-neutral-300 rounded-lg text-sm font-medium transition-colors border border-neutral-800">
          <Edit2 size={16} />
          Edit
        </button>
        <JobDeleteAlert jobTitle={job.jobTitle} jobId={job._id} />
      </div>
    </div>
  );
}
