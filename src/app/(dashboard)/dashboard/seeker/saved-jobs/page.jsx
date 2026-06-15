import React from "react";
import { mySavedJobs } from "@/lib/api/savedJob";
import { getUserSession } from "@/lib/core/session";
import { Bookmark, AlertCircle, Hourglass } from "lucide-react";
import SavedJobCard from "@/components/Dashboard/Seeker/SavedJobCard";

export default async function SeekerSavedJobsPage() {
  const user = await getUserSession();

  const savedJobs = (await mySavedJobs()) || [];

  const totalSavedCount = savedJobs.length;

  const closingSoonCount = savedJobs.filter((item) => {
    if (!item.deadline || item.jobStatus === "closed") return false;
    const diffTime = new Date(item.deadline) - new Date();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 && diffDays <= 3;
  }).length;

  return (
    <div className="min-h-screen bg-[#0B0B0C] text-white p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Header & Dynamic Stats Blocks Grid Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-neutral-900 pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              Saved Jobs
            </h1>
            <p className="text-sm text-neutral-400">
              Manage and track your bookmarked career opportunities.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Stat Box 1 */}
            <div className="bg-[#161719] border border-[#1f2125] rounded-2xl p-4 flex items-center gap-4 min-w-40">
              <div className="w-10 h-10 rounded-xl bg-neutral-800/60 flex items-center justify-center text-neutral-400">
                <Bookmark size={18} />
              </div>
              <div>
                <p className="text-[11px] text-neutral-500 font-medium uppercase tracking-wider">
                  Total Saved
                </p>
                <p className="text-xl font-bold text-white">
                  {totalSavedCount}
                </p>
              </div>
            </div>
            {/* Stat Box 2 */}
            <div className="bg-[#161719] border border-[#1f2125] rounded-2xl p-4 flex items-center gap-4 min-w-40">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
                <Hourglass size={18} />
              </div>
              <div>
                <p className="text-[11px] text-neutral-500 font-medium uppercase tracking-wider">
                  Closing Soon
                </p>
                <p className="text-xl font-bold text-white">
                  {closingSoonCount}
                </p>
              </div>
            </div>
          </div>
        </div>


        {/* Master List Stack Execution */}
        {savedJobs.length > 0 ? (
          <div className="flex flex-col gap-4">
            {savedJobs.map((item) => (
              <SavedJobCard key={item._id} job={item} user={user} />
            ))}
          </div>
        ) : (
          /* Empty State Template Fallback View */
          <div className="py-24 text-center border border-dashed border-neutral-800 rounded-3xl max-w-2xl mx-auto flex flex-col items-center justify-center p-6">
            <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-500 mb-4">
              <AlertCircle size={22} />
            </div>
            <h3 className="text-white text-lg font-semibold mb-1">
              No bookmarked opportunities
            </h3>
            <p className="text-neutral-500 text-sm max-w-sm">
              Jobs you bookmark while exploring our active directory list
              options will show up in this dashboard workspace.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
