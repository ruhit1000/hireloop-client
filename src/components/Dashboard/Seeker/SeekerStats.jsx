import React from "react";
import { Bookmark, Send, Calendar, Award } from "lucide-react";

export default function SeekerStats({ stats }) {
  const displayStats = {
    savedJobs: 12,
    applicationsSubmitted: 24,
    interviewsScheduled: 3,
    offersReceived: 1,
    ...stats,
  };

  const statCards = [
    {
      title: "Saved Jobs",
      value: displayStats.savedJobs,
      icon: <Bookmark className="size-5 text-neutral-300" strokeWidth={2} />,
    },
    {
      title: "Applications Submitted",
      value: displayStats.applicationsSubmitted,
      icon: <Send className="size-5 text-neutral-300" strokeWidth={2} />,
    },
    {
      title: "Interviews Scheduled",
      value: displayStats.interviewsScheduled,
      icon: <Calendar className="size-5 text-orange-500" strokeWidth={2} />,
    },
    {
      title: "Offers Received",
      value: displayStats.offersReceived,
      icon: <Award className="size-5 text-emerald-500" strokeWidth={2} />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
      {statCards.map((card, index) => (
        <div
          key={index}
          className="bg-[#161616] border border-neutral-800/70 rounded-xl p-5 flex flex-col justify-between h-33.75 hover:border-neutral-700/50 transition-colors"
        >
          <div className="flex justify-between items-start gap-3">
            <span className="text-[13px] font-medium text-neutral-400 tracking-wide max-w-30 leading-tight">
              {card.title}
            </span>
            <div className="shrink-0 pt-0.5">{card.icon}</div>
          </div>

          <div className="text-3xl font-semibold text-white tracking-tight">
            {card.value}
          </div>
        </div>
      ))}
    </div>
  );
}
