import React from "react";
import Image from "next/image";
import {
  MapPin,
  Globe,
  Users,
  Clock,
  Edit2,
  Trash2,
  XCircle,
} from "lucide-react";

const getStatusConfig = (status) => {
  switch (status) {
    case "rejected":
      return {
        style: "bg-red-500/10 border-red-500/20 text-red-500",
        icon: XCircle,
        label: "Rejected",
      };
    case "pending":
    default:
      return {
        style: "bg-yellow-500/10 border-yellow-500/20 text-yellow-500",
        icon: Clock,
        label: "Pending Approval",
      };
  }
};

export default function PendingCompanyCard({ company }) {
  const { style, icon: Icon, label } = getStatusConfig(company?.companyStatus);

  return (
    <div className="w-full max-w-3xl mx-auto bg-[#161616] border border-neutral-800 rounded-2xl p-6 my-10">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Company Info & Logo */}
        <div className="flex items-center gap-5 flex-1">
          <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[#222222] border border-neutral-700 shrink-0 flex items-center justify-center">
            {company.logo ? (
              <Image
                src={company.logo}
                alt={company.name}
                fill
                unoptimized
                className="object-contain p-2"
              />
            ) : (
              <span className="text-neutral-500 font-bold">
                {company.name?.charAt(0)}
              </span>
            )}
          </div>

          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-xl font-semibold text-white">
                {company.name}
              </h2>
              <span
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] uppercase tracking-wider font-bold ${style}`}
              >
                <Icon size={12} />
                {label}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-400 mt-2">
              <span className="text-white font-medium">{company.industry}</span>
              <div className="flex items-center gap-1.5">
                <MapPin size={14} /> {company.location}
              </div>
              <div className="flex items-center gap-1.5">
                <Globe size={14} /> {company.website}
              </div>
              <div className="flex items-center gap-1.5">
                <Users size={14} /> {company.employeeCount}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 shrink-0 border-t border-neutral-800 md:border-none pt-4 md:pt-0 mt-4 md:mt-0 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-[#222222] hover:bg-[#2A2A2A] text-neutral-300 rounded-lg text-sm font-medium transition-colors border border-neutral-700">
            <Edit2 size={16} />
            Edit
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg text-sm font-medium transition-colors border border-red-500/20">
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
