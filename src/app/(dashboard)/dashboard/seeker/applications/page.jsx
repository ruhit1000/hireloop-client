import SeekerStats from "@/components/Dashboard/Seeker/SeekerStats";
import ApplicationsTable from "@/components/Dashboard/Seeker/ApplicationsTable";
import { getApplicationsByApplicantId } from "@/lib/api/applications";
import { getUserSession } from "@/lib/core/session";
import React from "react";

const SeekersApplicationPage = async () => {
  const user = await getUserSession();
  const applications = await getApplicationsByApplicantId(user.id);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2 text-white">My Applications</h1>
      <p className="text-neutral-400 mb-8">
        Track your job applications and interview progress in real-time.
      </p>

      <div className="mb-8">
        <SeekerStats />
      </div>

      <ApplicationsTable applications={applications} />
    </div>
  );
};

export default SeekersApplicationPage;
