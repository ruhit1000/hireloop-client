import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getCompanyById } from "@/lib/api/company";
import {
  Building2,
  MapPin,
  Globe,
  Users,
  Briefcase,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";

const CompanyDetailsPage = async ({ params }) => {
  const { id } = await params;
  const company = await getCompanyById(id);

  if (!company) {
    return (
      <div className="min-h-screen bg-[#0B0B0C] text-white flex flex-col items-center justify-center p-6">
        <p className="text-neutral-400 text-sm mb-4">
          Company profile not found.
        </p>
        <Link
          href="/companies"
          className="text-xs text-white bg-neutral-900 border border-neutral-800 px-4 py-2 rounded-xl hover:bg-neutral-800 transition-all"
        >
          Back to Directory
        </Link>
      </div>
    );
  }

  const {
    name = "Unnamed Entity",
    industry = "Technology",
    website,
    location = "Not Specified",
    employeeCount = "Unknown",
    description = "No description provided.",
    companyStatus,
    activeJobs = 0,
  } = company;

  const isVerified = companyStatus === "approved";

  const displayWebsite = website?.replace(/^(https?:\/\/)?(www\.)?/, "");
  const absoluteWebsiteUrl = website?.startsWith("http")
    ? website
    : `https://${website}`;

  return (
    <div className="min-h-screen bg-[#0B0B0C] text-white p-6 pt-26">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Back Navigation Action Link */}
        <Link
          href="/companies"
          className="inline-flex items-center gap-2 text-xs text-neutral-400 hover:text-white transition-colors group"
        >
          <ArrowLeft
            size={14}
            className="transition-transform group-hover:-translate-x-0.5"
          />
          <span>Back to companies</span>
        </Link>

        {/* Profile Hero Header Banner Panel */}
        <div className="bg-[#161719] border border-[#1f2125] rounded-2xl p-6 md:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            {/* Logo Container with fallback block configuration */}
            <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden bg-[#23262a] border border-neutral-800 flex items-center justify-center shrink-0">
              {company.logo ? (
                <Image
                  src={company.logo}
                  alt={`${name} corporate identity logo`}
                  fill
                  className="object-cover object-center"
                />
              ) : (
                <Building2 size={32} className="text-neutral-500" />
              )}
            </div>

            {/* Profile Core Identities */}
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">
                  {name}
                </h1>
                {isVerified && (
                  <div className="inline-flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2.5 py-0.5 text-[10px] font-bold text-emerald-400 tracking-wide uppercase">
                    <CheckCircle2 size={10} className="fill-emerald-400/20" />
                    <span>Verified</span>
                  </div>
                )}
              </div>
              <p className="text-xs text-neutral-400 flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 font-medium text-neutral-400">
                  {industry}
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <MapPin size={12} className="text-neutral-500" /> {location}
                </span>
              </p>
            </div>
          </div>

          {/* Job Counter Metric Summary Layout Display Box */}
          <div className="bg-[#0B0B0C] border border-neutral-800/60 rounded-xl px-5 py-3 text-left md:text-right shrink-0 min-w-35">
            <p className="text-2xl font-black text-white">{activeJobs}</p>
            <p className="text-[11px] text-neutral-500 font-medium tracking-wide uppercase mt-0.5">
              {activeJobs === 1 ? "Open Position" : "Open Positions"}
            </p>
          </div>
        </div>

        {/* Core Layout Content Break Grid Split */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Content Column (Left Side Panel) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#161719] border border-[#1f2125] rounded-2xl p-6 md:p-8 space-y-4 shadow-lg">
              <h2 className="text-lg font-bold text-white border-b border-neutral-900 pb-3">
                About Company
              </h2>
              <p className="text-sm text-neutral-300 leading-relaxed whitespace-pre-line">
                {description}
              </p>
            </div>
          </div>

          {/* Metadata Infobox Sidebar Column Panel (Right Side) */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#161719] border border-[#1f2125] rounded-2xl p-6 space-y-5 shadow-lg">
              <h2 className="text-sm font-bold text-white tracking-wider uppercase border-b border-neutral-900 pb-3">
                Company Details
              </h2>

              <div className="space-y-4">
                {/* Website row field component */}
                {website && (
                  <div className="flex items-start gap-3">
                    <Globe
                      size={16}
                      className="text-neutral-500 shrink-0 mt-0.5"
                    />
                    <div className="space-y-0.5">
                      <p className="text-[10px] font-bold tracking-wider text-neutral-500 uppercase">
                        Website
                      </p>
                      <a
                        href={absoluteWebsiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-400 hover:underline font-medium break-all"
                      >
                        {displayWebsite}
                      </a>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <Users
                    size={16}
                    className="text-neutral-500 shrink-0 mt-0.5"
                  />
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-bold tracking-wider text-neutral-500 uppercase">
                      Company Size
                    </p>
                    <p className="text-xs text-neutral-300 font-medium">
                      {employeeCount} employees
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin
                    size={16}
                    className="text-neutral-500 shrink-0 mt-0.5"
                  />
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-bold tracking-wider text-neutral-500 uppercase">
                      Headquarters
                    </p>
                    <p className="text-xs text-neutral-300 font-medium">
                      {location}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Briefcase
                    size={16}
                    className="text-neutral-500 shrink-0 mt-0.5"
                  />
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-bold tracking-wider text-neutral-500 uppercase">
                      Industry
                    </p>
                    <p className="text-xs text-neutral-300 font-medium">
                      {industry}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailsPage;
