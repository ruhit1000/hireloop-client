import React from "react";

export default function Loading() {
  const skeletonCards = Array.from({ length: 6 });

  return (
    <div className="min-h-screen bg-[#0B0B0C] p-6 pt-26">
      <div className="max-w-7xl mx-auto w-full space-y-8 animate-pulse">
        
        {/* Header Section Skeleton */}
        <div className="space-y-3">
          <div className="h-8 w-48 bg-neutral-800 rounded-xl" />
          <div className="h-4 w-96 bg-neutral-900 rounded-lg" />
        </div>

        {/* Filter Bar Skeleton */}
        <div className="h-14 w-full bg-[#161719] border border-[#1f2125] rounded-2xl" />

        {/* Jobs Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skeletonCards.map((_, index) => (
            <div 
              key={index} 
              className="h-70 bg-[#161719] border border-[#1f2125] rounded-2xl p-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Logo & Top Meta */}
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 bg-neutral-800 rounded-xl" />
                  <div className="w-8 h-8 bg-neutral-800 rounded-full" />
                </div>
                {/* Title & Company */}
                <div className="space-y-2">
                  <div className="h-5 w-3/4 bg-neutral-800 rounded-lg" />
                  <div className="h-4 w-1/4 bg-neutral-900 rounded-md" />
                </div>
              </div>

              {/* Tags & Bottom Row */}
              <div className="space-y-3 pt-4 border-t border-neutral-950">
                <div className="flex gap-2">
                  <div className="h-6 w-16 bg-neutral-900 rounded-md" />
                  <div className="h-6 w-20 bg-neutral-900 rounded-md" />
                </div>
                <div className="flex justify-between items-center pt-2">
                  <div className="h-4 w-24 bg-neutral-800 rounded-md" />
                  <div className="h-8 w-24 bg-neutral-800 rounded-xl" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}