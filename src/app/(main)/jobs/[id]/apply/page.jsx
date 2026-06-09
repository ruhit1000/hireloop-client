import { getJobById } from "@/lib/api/jobs";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import React from "react";
import Link from "next/link";
import JobApply from "./JobApply";
import { getApplicationsByApplicantId } from "@/lib/api/applications";
import { AlertCircle, Crown, Info } from "lucide-react";
import { getPlanById } from "@/lib/api/plans";

const ApplyPage = async ({ params }) => {
  const { id } = await params;
  const user = await getUserSession();

  if (!user) {
    redirect(`/signin?redirect=/jobs/${id}/apply`);
  }

  if (user.role !== "seeker") {
    return (
      <div className="min-h-screen bg-[#0B0B0C] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
        <p className="text-neutral-400 mb-6">
          Only job seekers can apply for jobs. Please sign in with a seeker
          account to proceed.
        </p>
      </div>
    );
  }

  const applications = await getApplicationsByApplicantId(user.id);
  const jobDetails = await getJobById(id);

  const plan = await getPlanById(user?.plan || "seeker_free");

  const totalApplied = applications.length;
  const isLimitReached = totalApplied >= plan.maxApplicationsPerMonth;
  const applicationsLeft = plan.maxApplicationsPerMonth - totalApplied;

  return (
    <div className="pt-30 pb-20 min-h-screen bg-[#0B0B0C] px-4 sm:px-6 flex flex-col items-center">
      {isLimitReached ? (
        // --- LIMIT REACHED STATE ---
        <div className="max-w-xl w-full bg-[#161616] border border-neutral-800 rounded-3xl p-8 sm:p-10 text-center shadow-2xl mt-8">
          <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <AlertCircle size={32} className="text-red-400" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Application Limit Reached
          </h2>
          <p className="text-neutral-400 mb-8 leading-relaxed">
            You have used all <strong>{plan.maxApplicationsPerMonth}</strong> of
            your monthly applications on the {plan.name} plan. Upgrade to unlock
            more applications and land your dream job faster.
          </p>
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-linear-to-r from-sky-500 to-orange-500 hover:from-sky-400 hover:to-orange-400 text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.4)] active:scale-[0.98]"
          >
            <Crown size={18} />
            Upgrade Plan
          </Link>
        </div>
      ) : (
        // --- ALLOWED TO APPLY STATE ---
        <div className="max-w-2xl w-full">
          {/* Status Banner */}
          <div className="mb-6 bg-sky-500/10 border border-sky-500/20 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Info size={20} className="text-sky-400 shrink-0" />
              <span className="text-sm text-sky-100">
                You have used <strong>{totalApplied}</strong> out of{" "}
                <strong>{plan.maxApplicationsPerMonth}</strong> applications
                this month.
              </span>
            </div>
            <span className="text-xs font-bold px-3 py-1.5 bg-sky-500/20 text-sky-300 rounded-lg whitespace-nowrap text-center">
              {applicationsLeft} Left
            </span>
          </div>

          {/* Application Form Component */}
          <JobApply jobDetails={jobDetails} applicant={user} />
        </div>
      )}
    </div>
  );
};

export default ApplyPage;
