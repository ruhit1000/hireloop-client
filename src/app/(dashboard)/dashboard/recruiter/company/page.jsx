import NoCompanyState from "@/components/Dashboard/Recruiter/NoCompanyState";
import PendingCompanyCard from "@/components/Dashboard/Recruiter/PendingCompanyCard";
import { getCompanyByUserId } from "@/lib/api/company";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React from "react";

const MyCompanyPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;
  const userId = user?.id;

  const companyInfo = await getCompanyByUserId(userId);

  const hasCompany = companyInfo && Object.keys(companyInfo).length > 0;

  // FIX: Check for both pending and rejected statuses
  const isPendingOrRejected =
    companyInfo?.companyStatus === "pending" ||
    companyInfo?.companyStatus === "rejected";

  return (
    <div className="w-full">
      {!hasCompany ? (
        <NoCompanyState />
      ) : isPendingOrRejected ? (
        <PendingCompanyCard company={companyInfo} />
      ) : (
        <div>
          <h1>My Company (Approved State)</h1>
        </div>
      )}
    </div>
  );
};

export default MyCompanyPage;
