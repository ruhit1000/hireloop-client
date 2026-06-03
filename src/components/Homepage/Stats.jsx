import React from "react";
import { FiBriefcase, FiStar } from "react-icons/fi";
import { BiBuilding } from "react-icons/bi";
import { MdOutlinePersonSearch } from "react-icons/md";

export default function Stats() {
  const stats = [
    { icon: <FiBriefcase size={20} />, value: "50K", label: "Active Jobs" },
    { icon: <BiBuilding size={20} />, value: "12K", label: "Companies" },
    {
      icon: <MdOutlinePersonSearch size={20} />,
      value: "2M",
      label: "Job Seekers",
    },
    { icon: <FiStar size={20} />, value: "97%", label: "Satisfaction Rate" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-6xl mx-auto px-6 relative z-10 -mt-10 mb-20">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="bg-[#0B0B0C] border border-neutral-800 rounded-2xl p-6 flex flex-col justify-between h-40 shadow-2xl"
        >
          <div className="text-neutral-400">{stat.icon}</div>
          <div>
            <h3 className="text-4xl font-bold text-white mb-1">{stat.value}</h3>
            <p className="text-sm text-neutral-400">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
