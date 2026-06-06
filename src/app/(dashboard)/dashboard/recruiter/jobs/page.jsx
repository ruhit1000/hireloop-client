import React from "react";
import Link from "next/link";
import { Plus, Clock } from "lucide-react"; // Added Clock icon
import { getCompanyJobs } from "@/lib/api/jobs";
import RecruiterJobList from "@/components/Dashboard/Recruiter/RecruiterJobList";
import { getCompanyByUserId } from "@/lib/api/company";
import { getUserSession } from "@/lib/core/session";

export default async function RecruiterJobs() {
  const user = await getUserSession();
  const userId = user?.id;

  const companyDetails = await getCompanyByUserId(userId);
  const isPending = companyDetails?.companyStatus === "pending";
  const companyId = companyDetails?._id;

  const alljobs = await getCompanyJobs(companyId);

  return (
    <div className="p-6 max-w-6xl mx-auto w-full">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Manage Jobs</h1>
          <p className="text-sm text-neutral-400">
            View, edit, and manage all your job postings.
          </p>
        </div>

        {/* Dynamic Button Logic */}
        {isPending ? (
          <button
            disabled
            className="flex items-center justify-center gap-2 bg-[#222222] text-neutral-500 border border-neutral-800 px-5 py-2.5 rounded-lg text-sm font-medium cursor-not-allowed"
          >
            <Plus size={18} />
            Add New Job
          </button>
        ) : (
          <Link
            href="/dashboard/recruiter/jobs/new"
            className="flex items-center justify-center gap-2 bg-[#6366f1] hover:bg-indigo-500 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
          >
            <Plus size={18} />
            Add New Job
          </Link>
        )}
      </div>

      {/* Pending Banner */}
      {isPending && (
        <div className="mb-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex items-start gap-3">
          <Clock className="text-yellow-500 mt-0.5 shrink-0" size={20} />
          <div>
            <h3 className="text-yellow-500 font-medium mb-1">
              Company Approval Pending
            </h3>
            <p className="text-sm text-yellow-500/80">
              Your company profile is currently under review. You will be able
              to post new jobs once your account is fully approved.
            </p>
          </div>
        </div>
      )}

      {/* Jobs List Section */}
      <section>
        <RecruiterJobList jobs={alljobs} />
      </section>
    </div>
  );
}
