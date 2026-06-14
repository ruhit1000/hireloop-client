import React from "react";
import JobCard from "@/components/AllJobs/JobCard";
import JobFilters from "@/components/AllJobs/JobFilters";
import { getAllActiveJobs } from "@/lib/api/jobs";
import { getUserSession } from "@/lib/core/session";
import JobsPagination from "@/components/AllJobs/JobsPagination";
import { getSavedJobIds } from "@/lib/api/savedJob";

const AlljobsPage = async ({ searchParams }) => {
  const params = await searchParams;

  const user = (await getUserSession()) || null;
  let savedJobIds = [];
  if (user) {
    try {
      savedJobIds = (await getSavedJobIds()) || [];
      // Double check that we definitely got an array back from our utility
      if (!Array.isArray(savedJobIds)) {
        savedJobIds = [];
      }
    } catch (error) {
      console.error("Error fetching saved job IDs:", error);
      savedJobIds = [];
    }
  }

  const dataEnvelope = await getAllActiveJobs(params);

  const jobs = dataEnvelope?.jobs || [];
  const meta = dataEnvelope?.meta || null;

  return (
    <div className="min-h-screen bg-[#0B0B0C] p-6 pt-26">
      <div className="max-w-7xl mx-auto w-full space-y-8">
        {/* Header Section */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Explore Jobs</h1>
          <p className="text-neutral-400 text-sm">
            Discover your next career move from our curated list of
            opportunities.
          </p>
        </div>

        <JobFilters />

        {/* Jobs List Section */}
        {jobs.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <JobCard
                  key={job._id}
                  job={job}
                  user={user}
                  isSaved={savedJobIds.includes(job._id)}
                />
              ))}
            </div>
            {/* Pass the pagination configuration meta wrapper object */}
            <JobsPagination meta={meta} />
          </>
        ) : (
          <div className="py-20 text-center border border-dashed border-neutral-800 rounded-2xl">
            <h3 className="text-white text-lg font-medium mb-1">
              No jobs found
            </h3>
            <p className="text-neutral-500 text-sm">
              Try adjusting your filters or search query.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlljobsPage;
