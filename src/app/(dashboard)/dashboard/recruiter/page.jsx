import React from "react";
import DashboardStats from "@/components/Dashboard/Recruiter/DashboardStats";
import {
  applicationsData,
  companiesData,
  dashboardDummyStats,
} from "@/Data/data";
import RecentApplications from "@/components/Dashboard/Recruiter/RecentApplications";
import MyTopCompanies from "@/components/Dashboard/Recruiter/MyTopCompanies";
import { getUserSession } from "@/lib/core/session";
import { getRecruiterStats } from "@/lib/api/stats";
import { CheckCircle, FileText, Users, Zap } from "lucide-react";

const RecruiterHomePage = async () => {
  const user = await getUserSession();
  const recruiterStats = await getRecruiterStats(user.id);

  const stats = [
    {
      icon: FileText,
      name: "Total Job Posts",
      data: recruiterStats.totalJobs,
    },
    {
      icon: Users,
      name: "Total Applications",
      data: recruiterStats.totalApplications,
    },
    {
      icon: Zap,
      name: "Active Jobs",
      data: recruiterStats.activeJobs,
    },
    {
      icon: CheckCircle,
      name: "Jobs Closed",
      data: recruiterStats.closedJobs,
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-4xl font-semibold mb-4">
        Welcome back, {user?.name.split(" ")[0]}!
      </h1>
      <div className="mt-8 p-4">
        <DashboardStats stats={stats} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6 mt-6 p-4">
        <RecentApplications applications={applicationsData} />
        <MyTopCompanies companies={companiesData} />
      </div>
    </div>
  );
};

export default RecruiterHomePage;
