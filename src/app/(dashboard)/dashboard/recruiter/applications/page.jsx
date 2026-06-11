import React from "react";
import { getApplicationsByRecruiterId } from "@/lib/api/applications";
import { getUserSession } from "@/lib/core/session";
import RecruiterApplicationsTable from "@/components/Dashboard/Recruiter/RecruiterApplicationsTable";
import { Inbox } from "lucide-react";

const RecruiterApplicationsPage = async () => {
  const user = await getUserSession();
  const applications = await getApplicationsByRecruiterId(user.id);

  const hasApplications = applications && applications.length > 0;

  return (
    <div className="p-6 max-w-7xl mx-auto w-full space-y-6">
      {/* Informative Section Heading */}
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">
          Incoming Applications
        </h1>
        <p className="text-sm text-neutral-400">
          Review talent submissions, evaluate introductory criteria, and shift
          candidate positions inside the review cycle.
        </p>
      </div>

      {/* Workspace Area Layout Validation Split */}
      {!hasApplications ? (
        <div className="flex flex-col items-center justify-center py-24 px-4 bg-[#111214] border border-neutral-800/80 rounded-2xl text-center">
          <div className="w-16 h-16 bg-[#161719] rounded-full flex items-center justify-center mb-5 border border-neutral-800">
            <Inbox className="text-neutral-500" size={28} />
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">
            No Applications Found
          </h3>
          <p className="text-neutral-400 text-sm max-w-sm">
            Active job hunters have not uploaded submittals to your listings
            yet. Check back once positions gain tracking.
          </p>
        </div>
      ) : (
        <RecruiterApplicationsTable initialApplications={applications} />
      )}
    </div>
  );
};

export default RecruiterApplicationsPage;
