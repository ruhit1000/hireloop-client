"use client";

import React, { useState } from "react";
import { ListBox, Select } from "@heroui/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FileText, ExternalLink } from "lucide-react";
import CoverLetterModal from "./CoverLetterModal";
import { updateApplicationStatus } from "@/lib/actions/applications";

const getInitials = (name) => {
  if (!name) return "";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(dateString));
};

export default function RecruiterApplicationsTable({ initialApplications }) {
  const router = useRouter();
  const [updatingId, setUpdatingId] = useState(null);

  const pipelineStates = [
    { id: "Applied", name: "Applied" },
    { id: "Under Review", name: "Under Review" },
    { id: "Shortlisted", name: "Shortlisted" },
    { id: "Rejected", name: "Rejected" },
    { id: "Offered", name: "Offered" },
  ];

  const handleStatusUpdate = async (
    applicationId,
    currentStatus,
    targetStatus,
  ) => {
    if (!targetStatus || targetStatus === currentStatus) return;

    try {
      setUpdatingId(applicationId);
      await updateApplicationStatus(applicationId, targetStatus);
      router.refresh();
    } catch (error) {
      console.error("Failed processing target submission shift:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="w-full relative">
      <div className="bg-[#111214] border border-[#1f2125] rounded-2xl overflow-hidden shadow-2xl">
        <div className="w-full overflow-x-auto">
          <div className="min-w-275 w-full text-left">
            {/* Table Matrix Header */}
            <div className="grid grid-cols-[1.5fr_1.5fr_1.2fr_1fr_1fr_1.2fr] gap-4 p-5 bg-[#161719] border-b border-[#1f2125] text-xs font-semibold text-neutral-400 uppercase tracking-wider">
              <div>Candidate Name</div>
              <div>Position Target</div>
              <div>Date Submitted</div>
              <div>Credentials</div>
              <div>Introductory</div>
              <div className="text-right pr-4">Review Pipeline</div>
            </div>

            {/* Table Matrix Body */}
            <div className="flex flex-col">
              {initialApplications.map((app) => (
                <div
                  key={app._id}
                  className="grid grid-cols-[1.5fr_1.5fr_1.2fr_1fr_1fr_1.2fr] gap-4 p-5 items-center border-b border-[#1f2125]/40 hover:bg-[#161719]/30 transition-colors duration-150"
                >
                  {/* Candidate Block */}
                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-[#161719] border border-[#23262a] flex items-center justify-center font-bold text-xs text-neutral-400 tracking-wider shrink-0">
                      {getInitials(app.applicantName)}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-medium text-white truncate">
                        {app.applicantName}
                      </span>
                      <span className="text-xs text-neutral-500 truncate mt-0.5">
                        {app.applicantEmail}
                      </span>
                    </div>
                  </div>

                  {/* Role Target */}
                  <div className="text-sm text-neutral-300 font-medium truncate">
                    {app.jobTitle}
                  </div>

                  {/* Submission Date */}
                  <div className="text-sm text-neutral-400 font-light">
                    {formatDate(app.applicationDate)}
                  </div>

                  {/* Resume & Portfolio Links */}
                  <div className="flex flex-col gap-1.5 justify-center text-xs">
                    <Link
                      href={app.resumeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 transition-colors font-medium w-fit"
                    >
                      <FileText size={13} />
                      Resume
                    </Link>
                    {app.portfolioLink && (
                      <Link
                        href={app.portfolioLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-neutral-400 hover:text-neutral-300 transition-colors font-light w-fit"
                      >
                        <ExternalLink size={13} />
                        Portfolio
                      </Link>
                    )}
                  </div>

                  {/* Open Letter Trigger */}
                  <div>
                    <CoverLetterModal application={app} />
                  </div>

                  {/* Status Pipeline Selection dropdown */}
                  <div className="flex justify-end pr-2">
                    {/* Dynamic styling map matching your dark UI theme */}
                    {(() => {
                      const statusStyles = {
                        Applied:
                          "bg-blue-500/10 border-blue-500/20 text-blue-400 hover:bg-blue-500/20",
                        "Under Review":
                          "bg-amber-500/10 border-amber-500/20 text-amber-400 hover:bg-amber-500/20",
                        Shortlisted:
                          "bg-indigo-500/10 border-indigo-500/20 text-indigo-400 hover:bg-indigo-500/20",
                        Rejected:
                          "bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20",
                        Offered:
                          "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20",
                      };

                      const currentTriggerStyle =
                        statusStyles[app.status] ||
                        "bg-[#161719] border-[#23262a] text-neutral-300 hover:bg-[#1f2125]";

                      return (
                        <Select
                          className="w-38.75"
                          placeholder="Shift status"
                          value={app.status}
                          onChange={(value) =>
                            handleStatusUpdate(app._id, app.status, value)
                          }
                          isDisabled={updatingId === app._id}
                          aria-label={`Shift review stage for candidate ${app.applicantName}`}
                        >
                          {/* Trigger styling is now dynamic */}
                          <Select.Trigger
                            className={`rounded-xl text-xs font-semibold border transition-all h-9 px-3 flex items-center justify-between cursor-pointer w-full ${currentTriggerStyle}`}
                          >
                            <Select.Value className="capitalize" />
                            <Select.Indicator />
                          </Select.Trigger>

                          <Select.Popover className="bg-[#111214] border border-[#1f2125] rounded-xl p-1 shadow-2xl z-50">
                            <ListBox>
                              {pipelineStates.map((item) => (
                                <ListBox.Item
                                  key={item.id}
                                  id={item.id}
                                  textValue={item.name}
                                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                                    app.status === item.id
                                      ? "bg-white text-black font-semibold shadow-md"
                                      : "text-neutral-400 hover:bg-[#161719] hover:text-white"
                                  }`}
                                >
                                  {item.name}
                                  <ListBox.ItemIndicator />
                                </ListBox.Item>
                              ))}
                            </ListBox>
                          </Select.Popover>
                        </Select>
                      );
                    })()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
