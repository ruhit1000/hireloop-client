import React from "react";
import Link from "next/link";

export default function MyTopCompanies({ companies }) {
  return (
    <div className="w-full flex flex-col gap-4">
      {/* Header */}
      <div className="flex justify-between items-end px-1">
        <h2 className="text-xl font-medium text-white">My Top Companies</h2>
        <Link href="/companies" className="text-sm text-neutral-400 hover:text-white transition-colors">
          View all
        </Link>
      </div>

      {/* List Container */}
      <div className="bg-[#161616] border border-neutral-800 rounded-xl p-6 flex flex-col h-full">
        <div className="flex flex-col gap-6 grow">
          {companies.map((company) => {
            const Icon = company.icon;
            return (
              <div key={company.id} className="flex items-center justify-between">
                
                {/* Left: Logo & Info */}
                <div className="flex items-center gap-4">
                  {/* Logo Box */}
                  <div className="w-12 h-12 rounded-lg bg-[#222222] border border-neutral-800 flex items-center justify-center shrink-0">
                    <Icon className="text-blue-400 size-6" strokeWidth={1.5} />
                  </div>
                  
                  {/* Company Info */}
                  <div className="flex flex-col">
                    <span className="text-base font-semibold text-white">{company.name}</span>
                    <span className="text-xs text-neutral-500 mt-0.5">
                      {company.industry} • {company.location}
                    </span>
                  </div>
                </div>

                {/* Right: Active Jobs */}
                <div className="flex flex-col items-end">
                  <span className="text-lg font-bold text-white leading-none mb-1">
                    {company.activeJobs}
                  </span>
                  <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">
                    Active Jobs
                  </span>
                </div>

              </div>
            );
          })}
        </div>

        {/* Footer Button */}
        <button className="w-full mt-8 py-3 rounded-lg border border-neutral-700 text-sm font-medium text-neutral-300 hover:bg-[#222222] hover:text-white transition-colors">
          View All Companies
        </button>
      </div>
    </div>
  );
}