"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, DollarSign, Clock, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@heroui/react";
import SaveJobButton from "@/components/AllJobs/SaveJobButton";

// Helper function to format relative timestamps cleanly
const getRelativeTimeString = (dateInput) => {
  if (!dateInput) return "";
  const now = new Date();
  const savedDate = new Date(dateInput);
  const diffTime = Math.abs(now - savedDate);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    if (diffHours === 0) return "Saved just now";
    return `Saved ${diffHours} ${diffHours === 1 ? "hour" : "hours"} ago`;
  }
  if (diffDays === 1) return "Saved yesterday";
  return `Saved ${diffDays} days ago`;
};

// Helper function to calculate remaining closure urgency threshold window metrics
const getDaysUntilDeadline = (deadlineString) => {
  if (!deadlineString) return null;
  const now = new Date();
  const deadline = new Date(deadlineString);
  const diffTime = deadline - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export default function SavedJobCard({ job, user }) {
  const isClosed =
    job.jobStatus === "closed" ||
    (getDaysUntilDeadline(job.deadline) !== null &&
      getDaysUntilDeadline(job.deadline) < 0);
  const daysLeft = getDaysUntilDeadline(job.deadline);

  const formatSalary = (amount) => {
    if (!amount) return "";
    return new Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(amount);
  };

  const salaryString =
    job.minSalary && job.maxSalary
      ? `$${formatSalary(job.minSalary)} - $${formatSalary(job.maxSalary)}`
      : "Salary Undisclosed";

  return (
    <div
      className={`border rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all duration-200 ${
        isClosed
          ? "bg-[#141415]/40 border-neutral-900/60 opacity-60"
          : "bg-[#161719] border-[#1f2125] hover:border-neutral-800"
      }`}
    >
      {/* Left Core Profile Block metadata */}
      <div className="flex items-start gap-4 min-w-0">
        <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-[#23262a] border border-neutral-800 flex items-center justify-center">
          {job.companyLogo ? (
            <Image
              src={job.companyLogo}
              alt={job.companyName || "Company logo"}
              fill
              sizes="48px"
              className="object-cover object-center"
            />
          ) : (
            <span className="text-neutral-500 font-bold text-sm">
              {job.companyName?.charAt(0) || "C"}
            </span>
          )}
        </div>

        <div className="space-y-2 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-semibold text-white truncate max-w-md">
              {job.jobTitle}
            </h3>
            <span className="px-2 py-0.5 rounded bg-[#23262a] text-[10px] font-semibold tracking-wider text-neutral-400 uppercase">
              {job.companyName}
            </span>
          </div>

          {/* Sub Row Attributes */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-neutral-400">
            <span className="flex items-center gap-1.5">
              <MapPin size={13} className="text-neutral-500" />
              {job.isRemote ? "Remote, Global" : "On-site"}
            </span>
            {!isClosed && (
              <span className="flex items-center gap-1.5">
                <DollarSign size={13} className="text-neutral-500" />
                {salaryString} {job.currency}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Right Interaction Matrix Controllers */}
      <div className="flex items-center md:justify-end gap-6 shrink-0 ml-auto md:ml-0 w-full md:w-auto justify-between">
        <div className="text-right hidden sm:block">
          <p className="text-xs text-neutral-400 flex items-center gap-1.5 justify-end">
            <Clock size={13} />
            {getRelativeTimeString(job.savedAt)}
          </p>
          {isClosed ? (
            <p className="text-xs text-red-400 font-medium mt-1">
              Closed reference profile
            </p>
          ) : (
            daysLeft !== null &&
            daysLeft <= 5 && (
              <p className="text-[11px] text-amber-500 font-medium mt-1">
                Closes in {daysLeft} {daysLeft === 1 ? "day" : "days"}
              </p>
            )
          )}
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          {/* Re-utilized state boundary controller */}
          <SaveJobButton jobId={job._id} user={user} initialIsSaved={true} />

          {isClosed ? (
            <Button
              size="md"
              variant="flat"
              color="danger"
              className="font-medium text-xs rounded-xl bg-red-500/10 text-red-400 border border-red-500/20"
            >
              Closed
            </Button>
          ) : (
            <Link
  href={`/jobs/${job._id}`}
  className="inline-flex items-center justify-center gap-2 bg-white text-black hover:bg-neutral-200 font-semibold text-xs rounded-xl px-5 h-9 transition-colors group/apply"
>
  Apply Now
  <ArrowRight 
    size={14} 
    className="transition-transform duration-200 group-hover/apply:translate-x-0.5" 
  />
</Link>
          )}
        </div>
      </div>
    </div>
  );
}
