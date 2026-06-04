import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React from "react";
import { FileText, Users, Zap, CheckCircle } from "lucide-react";
import DashboardStats from "@/components/Dashboard/DashboardStats";

const RecruiterHomePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  const dashboardDummyStats = [
    {
      icon: FileText,
      name: "Total Job Posts",
      data: "48",
    },
    {
      icon: Users,
      name: "Total Applicants",
      data: "1,284",
    },
    {
      icon: Zap,
      name: "Active Jobs",
      data: "18",
    },
    {
      icon: CheckCircle,
      name: "Jobs Closed",
      data: "32",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-4xl font-semibold mb-4">
        Welcome back, {user?.name.split(" ")[0]}!
      </h1>
      <div className="mt-8 p-4">
        <DashboardStats stats={dashboardDummyStats} />
      </div>
    </div>
  );
};

export default RecruiterHomePage;
