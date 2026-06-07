import React from "react";
import { Search, SlidersHorizontal, MapPin, Briefcase } from "lucide-react";
import { getAllJobs } from "@/lib/api/jobs";
import JobCard from "@/components/AllJobs/JobCard";

const AlljobsPage = async () => {
  const jobs = await getAllJobs();

  return (
    <div className="min-h-screen bg-[#0B0B0C] p-6 pt-26">
      <div className="max-w-6xl mx-auto w-full space-y-8">
        {/* Header Section */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Explore Jobs</h1>
          <p className="text-neutral-400 text-sm">
            Discover your next career move from our curated list of
            opportunities.
          </p>
        </div>

        {/* Search & Filter Bar Placeholder */}
        <div className="bg-[#161616] border border-neutral-800 rounded-xl p-4 flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by job title, company, or keywords..."
              className="w-full bg-[#222222] border border-neutral-700 text-white rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-white transition-colors"
            />
          </div>

          {/* Filter Buttons / Dropdowns */}
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-[#222222] border border-neutral-700 rounded-lg text-sm font-medium text-neutral-300 hover:text-white hover:bg-[#2A2A2A] transition-colors whitespace-nowrap">
              <MapPin size={16} />
              Location
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-[#222222] border border-neutral-700 rounded-lg text-sm font-medium text-neutral-300 hover:text-white hover:bg-[#2A2A2A] transition-colors whitespace-nowrap">
              <Briefcase size={16} />
              Job Type
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-[#6366f1] text-white rounded-lg text-sm font-medium hover:bg-indigo-500 transition-colors whitespace-nowrap">
              <SlidersHorizontal size={16} />
              Filters
            </button>
          </div>
        </div>

        {/* Jobs List Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map(job => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlljobsPage;
