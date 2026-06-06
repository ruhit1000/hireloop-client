import React from "react";
import Image from "next/image";
import {
  MapPin,
  Globe,
  Users,
  Edit2,
  Trash2,
  Building2,
  CheckCircle2,
} from "lucide-react";
import CompanyFormModal from "./CompanyFormModal";
import { CompanyDeleteAlert } from "./CompanyDeleteAlert";

export default function ApprovedCompanyView({ company, userId }) {
  const websiteUrl = company?.website?.startsWith("http")
    ? company.website
    : `https://${company.website}`;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Header Profile Section */}
      <div className="relative bg-[#161616] border border-neutral-800 rounded-2xl p-6 sm:p-10 overflow-hidden">
        {/* Subtle background glow effect */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#6366f1]/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

        <div className="flex flex-col md:flex-row justify-between gap-8 relative z-10">
          {/* Logo and Main Details */}
          <div className="flex flex-col sm:flex-row items-start gap-6 w-full">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-[#222222] border border-neutral-700 flex items-center justify-center p-3 shrink-0 shadow-lg">
              {company?.logo ? (
                <Image
                  src={company.logo}
                  alt={company.name}
                  fill
                  unoptimized
                  className="object-contain p-2"
                />
              ) : (
                <span className="text-3xl text-neutral-500 font-bold">
                  {company?.name?.charAt(0)}
                </span>
              )}
            </div>

            <div className="flex flex-col flex-1 mt-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {company?.name}
                </h1>
                <span className="flex items-center gap-1.5 px-2.5 py-1 bg-green-500/10 border border-green-500/20 text-green-500 text-[10px] sm:text-xs font-bold rounded-full uppercase tracking-wider">
                  <CheckCircle2 size={14} />
                  Approved
                </span>
              </div>

              {/* Meta details grid */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-neutral-400 mt-4">
                <div className="flex items-center gap-2">
                  <Building2 size={16} className="text-neutral-500" />
                  <span className="text-neutral-200 font-medium">
                    {company?.industry}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-neutral-500" />
                  <span>{company?.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-neutral-500" />
                  <span>{company?.employeeCount} Employees</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe size={16} className="text-[#6366f1]" />
                  <a
                    href={websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#6366f1] hover:text-indigo-400 hover:underline transition-colors"
                  >
                    {company?.website}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex sm:flex-col flex-row items-center sm:items-end gap-3 shrink-0 w-full sm:w-auto mt-4 md:mt-0 pt-6 md:pt-0 border-t border-neutral-800 md:border-none">
            <CompanyFormModal type="edit" initialData={company} />
            <CompanyDeleteAlert title={company?.name} id={company?._id} />
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="bg-[#161616] border border-neutral-800 rounded-2xl p-6 sm:p-10">
        <h3 className="text-lg font-semibold text-white mb-5 border-b border-neutral-800 pb-4">
          Company Overview
        </h3>
        <p className="text-neutral-300 text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
          {company?.description || "No description provided."}
        </p>
      </div>
    </div>
  );
}
