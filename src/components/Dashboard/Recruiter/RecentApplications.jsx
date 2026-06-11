import React from "react";
import Link from "next/link";

export default function RecentApplications({ applications }) {
  // Helper to get the right pill colors based on status
  const getStatusStyles = (status) => {
    switch (status) {
      case "Offered":
        return "text-green-500 bg-green-500/10 border-green-500/20";
      case "Under Review":
        return "text-neutral-300 bg-neutral-600/20 border-neutral-600/30";
      case "Shortlisted":
        return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
      case "Rejected":
        return "text-red-500 bg-red-500/10 border-red-500/20";
      default:
        return "text-neutral-400 bg-neutral-800 border-neutral-700";
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Header */}
      <div className="flex justify-between items-end px-1">
        <h2 className="text-xl font-medium text-white">Recent Applications</h2>
        <Link
          href="/applications"
          className="text-sm text-neutral-400 hover:text-white transition-colors"
        >
          View all
        </Link>
      </div>

      {/* Table Container */}
      <div className="bg-[#161616] border border-neutral-800 rounded-xl overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-[2fr_2fr_1.5fr_1fr_1fr] gap-4 p-5 border-b border-neutral-800 text-sm font-medium text-neutral-400">
          <div>Candidate Name</div>
          <div>Role</div>
          <div>Date Applied</div>
          <div>Resume</div>
          <div>Status</div>
        </div>

        {/* Table Body */}
        <div className="flex flex-col">
          {applications.map((app, index) => (
            <div
              key={app._id}
              className={`grid grid-cols-[2fr_2fr_1.5fr_1fr_1fr] gap-4 p-5 items-center ${
                index !== applications.length - 1
                  ? "border-b border-neutral-800/50"
                  : ""
              }`}
            >
              {/* Name & Avatar */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-neutral-800 shrink-0"></div>
                <span className="text-sm font-medium text-white">
                  {app.applicantName}
                </span>
              </div>

              {/* Role */}
              <div className="text-sm text-neutral-400">{app.jobTitle}</div>

              {/* Date */}
              <div className="text-sm text-neutral-400">
                {new Intl.DateTimeFormat("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }).format(new Date(app.applicationDate))}
              </div>

              {/* Resume */}
              <div className="text-sm text-neutral-400">
                <Link
                  href={app.resumeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-400"
                >
                  View Resume
                </Link>
              </div>

              {/* Status Pill */}
              <div>
                <span
                  className={`px-3 py-1 text-xs font-medium border rounded-full ${getStatusStyles(app.status)}`}
                >
                  {app.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
