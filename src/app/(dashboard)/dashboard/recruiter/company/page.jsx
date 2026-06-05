import NoCompanyState from "@/components/Dashboard/Recruiter/NoCompanyState";
import PendingCompanyCard from "@/components/Dashboard/Recruiter/PendingCompanyCard";
import ApprovedCompanyView from "@/components/Dashboard/Recruiter/ApprovedCompanyView";
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

  const isPendingOrRejected =
    companyInfo?.companyStatus === "pending" ||
    companyInfo?.companyStatus === "rejected";

  return (
    <div className="w-full p-10">
      {!hasCompany ? (
        <NoCompanyState userId={userId} />
      ) : isPendingOrRejected ? (
        <PendingCompanyCard company={companyInfo} userId={userId} />
      ) : (
        <ApprovedCompanyView company={companyInfo} userId={userId} />
      )}
    </div>
  );
};

export default MyCompanyPage;
