"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function CompanyCard({ company }) {
  const {
    _id,
    name = "Unnamed Entity",
    logo,
    companyStatus = "pending",
    industry = "Technology",
    location = "Remote",
    description = "No company description provided.",
    activeJobs = 0,
  } = company;

  const isVerified = companyStatus === "approved";

  return (
    <div className="bg-[#161719] border border-[#1f2125] hover:border-neutral-800 rounded-2xl p-6 flex flex-col justify-between gap-6 transition-all duration-200 group/card shadow-lg">
      {/* Top Details & Context */}
      <div className="space-y-4">
        {/* Logo & Verified Badge Row */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-[#23262a] border border-neutral-800 flex items-center justify-center shrink-0">
            {logo ? (
              <Image
                src={logo}
                alt={`${name} profile logo`}
                fill
                sizes="48px"
                className="object-cover object-center"
              />
            ) : (
              <span className="text-neutral-400 font-bold text-sm">
                {name.charAt(0)}
              </span>
            )}
          </div>

          {isVerified && (
            <div className="inline-flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2.5 py-0.5 text-[10px] font-bold text-emerald-400 tracking-wide uppercase">
              <CheckCircle2 size={10} className="fill-emerald-400/20" />
              <span>Verified</span>
            </div>
          )}
        </div>

        {/* Title and Short Description Summary Blocks */}
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-white group-hover/card:text-neutral-200 transition-colors truncate">
            {name}
          </h3>
          <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Filter Attributes Tags Row */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="px-2.5 py-1 rounded-lg bg-[#23262a] border border-neutral-800/60 text-[11px] text-neutral-400 font-medium">
            {industry}
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-[#23262a] border border-neutral-800/60 text-[11px] text-neutral-400 font-medium">
            {location}
          </span>
        </div>
      </div>

      {/* Footer Meta Row Line */}
      <div className="pt-4 border-t border-neutral-900/60 flex items-center justify-between text-xs font-semibold">
        <span className="text-neutral-400">
          {activeJobs} {activeJobs === 1 ? "Active Job" : "Active Jobs"}
        </span>

        <Link
          href={`/companies/${_id}`}
          className="inline-flex items-center gap-1 text-white hover:text-neutral-300 transition-colors group/link"
        >
          <span>View Openings</span>
          <ArrowRight
            size={14}
            className="transition-transform duration-200 group-hover/link:translate-x-0.5"
          />
        </Link>
      </div>
    </div>
  );
}
