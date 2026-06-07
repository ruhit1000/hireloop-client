import AddNewJob from "@/components/Dashboard/Recruiter/AddNewJob";
import { getCompanyByUserId } from "@/lib/api/company";
import { getUserSession } from "@/lib/core/session";
import { Clock } from "lucide-react";
import React from "react";

const AddNewJobPage = async () => {
  const user = await getUserSession();
  const userId = user?.id;
  const companyDetails = await getCompanyByUserId(userId);
  const isPending = companyDetails?.companyStatus === "pending";
  const companyId = companyDetails?._id;
  if (isPending) {
    return (
      <div className="p-6">
        <div className="mb-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex items-start gap-3">
          <Clock className="text-yellow-500 mt-0.5 shrink-0" size={20} />
          <div>
            <h3 className="text-yellow-500 font-medium mb-1">
              Company Approval Pending
            </h3>
            <p className="text-sm text-yellow-500/80">
              Your company profile is currently under review. You will be able
              to post new jobs once your account is fully approved.
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    return <AddNewJob company={companyDetails} />;
  }
};

export default AddNewJobPage;
