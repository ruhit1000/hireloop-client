"use client";

import React, { useState } from "react";
import { FileText } from "lucide-react";
import { Button } from "@heroui/react";

export default function ResumeUpload() {
  const [resume, setResume] = useState({
    name: "Jane_Doe_Resume_2023.pdf",
    uploadedAt: "Last updated 2 days ago",
    size: "1.2 MB",
  });

  return (
    <div className="bg-[#161719] border border-[#1f2125] rounded-2xl p-6 space-y-4">
      <div className="space-y-1">
        <h2 className="text-lg font-bold text-white">Resume</h2>
        <p className="text-xs text-neutral-400">
          Upload your most recent resume to enable one-click applications.
        </p>
      </div>

      {/* Dotted Upload Layout Box */}
      <div className="border border-dashed border-neutral-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center bg-[#0B0B0C]/40">
        <div className="w-10 h-10 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-center justify-center text-neutral-400 mb-3">
          <FileText size={18} />
        </div>

        {resume ? (
          <>
            <p className="text-xs font-semibold text-white max-w-45 truncate">
              {resume.name}
            </p>
            <p className="text-[10px] text-neutral-500 mt-1">
              {resume.uploadedAt} • {resume.size}
            </p>
            
            {/* Context Item Manipulation Row */}
            <div className="flex items-center gap-2 mt-4 w-full">
              <Button
                size="sm"
                className="flex-1 bg-[#262626] text-white hover:bg-neutral-800 border border-neutral-800 text-[11px] font-medium rounded-xl h-8"
              >
                Replace
              </Button>
              <Button
                size="sm"
                variant="bordered"
                className="flex-1 border-red-500/10 text-red-400 bg-red-500/5 hover:bg-red-500/10 text-[11px] font-medium rounded-xl h-8"
              >
                Remove
              </Button>
            </div>
          </>
        ) : (
          <p className="text-xs text-neutral-500">No file uploaded yet</p>
        )}
      </div>
    </div>
  );
}