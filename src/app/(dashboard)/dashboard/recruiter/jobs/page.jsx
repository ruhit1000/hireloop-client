import React from "react";
import Link from "next/link";
import { Plus, Clock, Building2 } from "lucide-react"; // Added Building2 icon
import { getCompanyJobs } from "@/lib/api/jobs";
import RecruiterJobList from "@/components/Dashboard/Recruiter/RecruiterJobList";
import { getCompanyByUserId } from "@/lib/api/company";
import { getUserSession } from "@/lib/core/session";

export default async function RecruiterJobs() {
  const user = await getUserSession();
  const userId = user?.id;

  const companyDetails = await getCompanyByUserId(userId);
  const hasCompany = Object.keys(companyDetails || {}).length > 0;
  const isPending = companyDetails?.companyStatus === "pending";
  const companyId = companyDetails?._id;

  // Only fetch jobs if a company exists
  const alljobs = hasCompany ? await getCompanyJobs(companyId) : [];

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
        {isPending || !hasCompany ? (
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

      {/* Conditional Rendering based on Company Status */}
      {!hasCompany ? (
        /* No Company State */
        <div className="flex flex-col items-center justify-center py-20 px-4 bg-[#161616] border border-neutral-800 rounded-2xl text-center">
          <div className="w-16 h-16 bg-[#222222] rounded-full flex items-center justify-center mb-5 border border-neutral-700">
            <Building2 className="text-neutral-400" size={32} />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            No Company Registered
          </h3>
          <p className="text-neutral-400 text-sm max-w-md mb-6">
            You need to set up your company profile before you can start posting
            and managing jobs.
          </p>
          <Link
            href="/dashboard/recruiter/company"
            className="bg-white text-black hover:bg-neutral-200 px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors"
          >
            Register Company
          </Link>
        </div>
      ) : (
        /* Existing Company State */
        <>
          {/* Pending Banner */}
          {isPending && (
            <div className="mb-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex items-start gap-3">
              <Clock className="text-yellow-500 mt-0.5 shrink-0" size={20} />
              <div>
                <h3 className="text-yellow-500 font-medium mb-1">
                  Company Approval Pending
                </h3>
                <p className="text-sm text-yellow-500/80">
                  Your company profile is currently under review. You will be
                  able to post new jobs once your account is fully approved.
                </p>
              </div>
            </div>
          )}

          {/* Jobs List Section */}
          <section>
            <RecruiterJobList jobs={alljobs} />
          </section>
        </>
      )}
    </div>
  );
}
