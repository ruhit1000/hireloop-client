import React from "react";
import DashboardStats from "@/components/Dashboard/Recruiter/DashboardStats";
import AdminCompaniesTable from "@/components/Dashboard/Admin/AdminCompaniesTable";
import { getCompanies } from "@/lib/api/company";
import { Ban, CircleCheckBig, Clock } from "lucide-react";
import { getUserById } from "@/lib/api/users";

const AdminCompaniesPage = async ({ searchParams }) => {

  const params = await searchParams;
  const currentPage = parseInt(params?.page) || 1;
  const currentStatus = params?.status || "all";

  // Fetch the target chunk window of data from the database collection
  const resultData = await getCompanies(currentPage, 5, currentStatus);

  // Concurrently resolve profile details for the associated recruiters
  const emailMap = {};
  await Promise.all(
    resultData.companies.map(async (company) => {
      if (company.recruiterId && !emailMap[company.recruiterId]) {
        try {
          const userProfile = await getUserById(company.recruiterId);
          emailMap[company.recruiterId] = userProfile?.email || "N/A";
        } catch (error) {
          emailMap[company.recruiterId] = "Error loading";
        }
      }
    }),
  );

  // Map active metrics panels utilizing database return sets
  const stats = [
    {
      icon: Clock,
      name: "PENDING REVIEW",
      data: resultData.stats.pending.toString(),
    },
    {
      icon: CircleCheckBig,
      name: "APPROVED PARTNERS",
      data: resultData.stats.approved.toString(),
    },
    {
      icon: Ban,
      name: "TOTAL REJECTIONS",
      data: resultData.stats.rejected.toString(),
    },
  ];

  return (
    <div className="p-6 space-y-8 min-h-screen bg-[#0B0B0C]">
      {/* Context Header Area */}
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">
          Company Registrations
        </h1>
        <p className="text-neutral-400 text-sm">
          Review and manage corporate entity access requests for the HireLoop
          ecosystem.
        </p>
      </div>

      {/* Performance Counters Section */}
      <div className="bg-[#161616] border border-neutral-800/60 rounded-2xl p-4">
        <DashboardStats stats={stats} />
      </div>

      {/* Structured Paginated Table Layout Wrapper */}
      <AdminCompaniesTable data={resultData} emails={emailMap} />
    </div>
  );
};

export default AdminCompaniesPage;
