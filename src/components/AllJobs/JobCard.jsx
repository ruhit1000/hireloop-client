import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Briefcase, DollarSign, ArrowRight } from "lucide-react";

export default function JobCard({ job }) {
  // Helper to format numbers like 90000 into "90K"
  const formatSalary = (amount) => {
    if (!amount) return "";
    return new Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(amount);
  };

  const salaryString =
    job.minSalary && job.maxSalary
      ? `${formatSalary(job.minSalary)} - ${formatSalary(job.maxSalary)} ${job.currency}`
      : "Salary Undisclosed";

  const locationString = job.isRemote ? "Remote" : "On-site";

  return (
    <div className="bg-[#1C1C1C] border border-neutral-800 rounded-3xl p-6 flex flex-col h-full hover:border-neutral-700 transition-colors">
      {/* Top Section */}
      <div className="flex-1">
        {/* NEW: Company Info Row */}
        <div className="flex items-center gap-3 mb-4">
          <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0">
            {job.companyLogo ? (
              <Image
                src={job.companyLogo}
                alt={job.companyName || "Company logo"}
                fill
                sizes="40px"
                className="object-cover object-center"
              />
            ) : (
              <span className="text-neutral-500 font-bold text-sm flex items-center justify-center w-full h-full">
                {job.companyName?.charAt(0) || "C"}
              </span>
            )}
          </div>
          <span className="text-neutral-300 font-medium text-sm">
            {job.companyName || "Unknown Company"}
          </span>
        </div>

        <h3 className="text-xl font-semibold text-white mb-3">
          {job.jobTitle}
        </h3>

        {/* Truncated Description */}
        <p className="text-neutral-400 text-sm line-clamp-2 mb-6 leading-relaxed">
          {job.responsibilities}
        </p>

        {/* Pills Container */}
        <div className="flex flex-wrap gap-2.5 mb-6">
          <span className="flex items-center gap-2 px-3 py-1.5 bg-[#262626] rounded-full text-xs font-medium text-neutral-200">
            <MapPin size={14} className="text-fuchsia-400" />
            {locationString}
          </span>
          <span className="flex items-center gap-2 px-3 py-1.5 bg-[#262626] rounded-full text-xs font-medium text-neutral-200">
            <Briefcase size={14} className="text-fuchsia-400" />
            {job.jobType}
          </span>
          <span className="flex items-center gap-2 px-3 py-1.5 bg-[#262626] rounded-full text-xs font-medium text-neutral-200">
            <DollarSign size={14} className="text-fuchsia-400" />
            {salaryString}
          </span>
        </div>
      </div>

      {/* Footer Section */}
      <div className="pt-4 mt-auto">
        <Link
          href={`/jobs/${job._id}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-neutral-300 transition-colors group"
        >
          Apply Now
          <ArrowRight
            size={16}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </div>
    </div>
  );
}
