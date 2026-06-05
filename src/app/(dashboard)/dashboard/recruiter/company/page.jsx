import NoCompanyState from "@/components/Dashboard/Recruiter/NoCompanyState";
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

  // Safely check if the object exists and is not empty
  const hasCompany = companyInfo && Object.keys(companyInfo).length > 0;

  return (
    <div className="w-full">
      {!hasCompany ? (
        <NoCompanyState />
      ) : (
        <div>
          <h1>My Company (Next Step)</h1>
        </div>
      )}
    </div>
  );
};

export default MyCompanyPage;
