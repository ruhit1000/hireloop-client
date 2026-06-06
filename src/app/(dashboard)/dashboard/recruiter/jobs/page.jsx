import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { getCompanyJobs } from "@/lib/api/jobs";
import RecruiterJobList from "@/components/Dashboard/Recruiter/RecruiterJobList";
import { getCompanyByUserId } from "@/lib/api/company";
import { getUserSession } from "@/lib/core/session";

export default async function RecruiterJobs() {
  const user = await getUserSession();
  const userId = user?.id;

  const companyDetails = await getCompanyByUserId(userId);
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

        <Link
          href="/dashboard/recruiter/jobs/new"
          className="flex items-center justify-center gap-2 bg-[#6366f1] hover:bg-indigo-500 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus size={18} />
          Add New Job
        </Link>
      </div>

      {/* Jobs List Section */}
      <section>
        <RecruiterJobList jobs={alljobs} />
      </section>
    </div>
  );
}
