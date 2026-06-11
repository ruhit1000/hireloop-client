import React from "react";
import { getUserSession } from "@/lib/core/session";
import UpdateUser from "@/components/Dashboard/Recruiter/UpdateUser";
import { Settings } from "lucide-react";

const RecruiterSettingsPage = async () => {
  const user = await getUserSession();

  return (
    <div className="p-6 max-w-3xl mx-auto w-full space-y-6">
      {/* Configuration Header Row */}
      <div className="flex items-center gap-3 border-b border-[#1f2125] pb-5">
        <div className="w-10 h-10 bg-[#161719] border border-[#23262a] rounded-xl flex items-center justify-center text-neutral-400">
          <Settings size={20} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white mb-0.5">
            Account Settings
          </h1>
          <p className="text-sm text-neutral-400">
            Manage your personal workspace identity, credentials, and profile
            settings.
          </p>
        </div>
      </div>

      <UpdateUser user={user} />
    </div>
  );
};

export default RecruiterSettingsPage;
