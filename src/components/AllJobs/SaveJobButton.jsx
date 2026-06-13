"use client";

import React, { useState } from "react";
import { Bookmark } from "lucide-react";
import { toggleSavedJob } from "@/lib/actions/savedJob";


export default function SaveJobButton({ jobId, user, initialIsSaved }) {
  const [isSaved, setIsSaved] = useState(initialIsSaved);
  const [isLoading, setIsLoading] = useState(false);

  const handleBookmarkClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      alert("Please log in to save this job opportunity.");
      return;
    }

    try {
      setIsLoading(true);
      const res = await toggleSavedJob(jobId);
      setIsSaved(res.saved);
    } catch (error) {
      console.error("Failed to toggle job save:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleBookmarkClick}
      disabled={isLoading}
      className={`w-9 h-9 rounded-full bg-[#262626] border border-neutral-800 hover:border-neutral-700 text-white flex items-center justify-center transition-all duration-200 shrink-0 shadow-lg cursor-pointer group/btn ${
        isLoading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      aria-label={isSaved ? "Unsave job" : "Save job"}
    >
      <Bookmark
        size={15}
        className="transition-transform duration-150 group-hover/btn:scale-110"
        fill={isSaved ? "#FFFFFF" : "none"}
        strokeWidth={isSaved ? 0 : 2}
      />
    </button>
  );
}
