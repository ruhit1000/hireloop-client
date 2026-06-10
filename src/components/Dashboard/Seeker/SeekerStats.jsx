import React from "react";
import { Send, Star, Calendar, TrendingUp } from "lucide-react";

export default function SeekerStats() {
  const seekerDashboardStats = [
    { name: "Total Applied", data: "24" },
    { name: "Shortlisted", data: "8" },
    { name: "Interviews", data: "3" },
    { name: "Success Rate", data: "12%" },
  ];

  // Hardcoded styles and icons mapped by index
  const cardConfigs = [
    { icon: Send, textColor: "text-white" },
    { icon: Star, textColor: "text-white" },
    { icon: Calendar, textColor: "text-orange-500" },
    { icon: TrendingUp, textColor: "text-emerald-500" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {seekerDashboardStats.map((stat, index) => {
        const { icon: Icon, textColor } = cardConfigs[index];

        return (
          <div
            key={index}
            className="bg-[#161616] border border-neutral-800 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden h-30"
          >
            {/* Label and Icon */}
            <div className="flex justify-between items-start">
              <span className="text-neutral-400 text-sm font-medium tracking-wide">
                {stat.name}
              </span>
              <Icon size={16} className="text-neutral-600 mt-0.5" />
            </div>

            {/* Value */}
            <div className={`text-4xl font-bold tracking-tight ${textColor}`}>
              {stat.data}
            </div>
          </div>
        );
      })}
    </div>
  );
}
