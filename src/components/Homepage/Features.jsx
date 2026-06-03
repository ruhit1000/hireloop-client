import React from "react";
import {
  Search,
  LineChart,
  Building2,
  Bookmark,
  MousePointerClick,
  FileText,
  Hexagon,
  TrendingUp,
} from "lucide-react";

export default function Features() {
  const featuresData = [
    {
      icon: Search,
      title: "Smart Search",
      description: "Find your ideal job with advanced filters.",
    },
    {
      icon: LineChart,
      title: "Salary Insights",
      description: "Get real salary data to negotiate confidently.",
    },
    {
      icon: Building2,
      title: "Top Companies",
      description: "Apply to vetted companies that are hiring.",
    },
    {
      icon: Bookmark,
      title: "Saved Jobs",
      description: "Manage apps & favorites on your dashboard.",
    },
    {
      icon: MousePointerClick,
      title: "One-Click Apply",
      description: "Simplify your job applications for an easier process!",
    },
    {
      icon: FileText,
      title: "Resume Builder",
      description: "Create professional resumes with modern templates.",
    },
    {
      icon: Hexagon,
      title: "Skill-Based Matching",
      description: "Discover jobs that match your skills and experience.",
    },
    {
      icon: TrendingUp,
      title: "Career Growth Resources",
      description: "Boost your career with quick interview tips.",
    },
  ];

  return (
    <section className="bg-[#111111] py-24 px-6 border-b border-neutral-900">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Header Section */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1.5 h-1.5 bg-indigo-500 rounded-sm"></div>
          <span className="text-neutral-400 text-xs font-semibold tracking-[0.2em] uppercase">
            Features
          </span>
          <div className="w-1.5 h-1.5 bg-indigo-500 rounded-sm"></div>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16 tracking-tight leading-tight">
          Everything you need <br className="hidden md:block" /> to succeed
        </h2>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 w-full">
          {featuresData.map((feature, index) => {
            const IconComponent = feature.icon;

            return (
              <div key={index} className="flex gap-5 items-start group">
                {/* Icon Box */}
                <div className="shrink-0 w-14 h-14 rounded-2xl bg-[#161616] border border-neutral-800 flex items-center justify-center transition-colors group-hover:border-neutral-600">
                  <IconComponent
                    className="text-pink-100/90 w-6 h-6"
                    strokeWidth={1.5}
                  />
                </div>

                {/* Text Content */}
                <div className="flex flex-col mt-1">
                  <h3 className="text-white font-medium text-[17px] mb-1.5">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-400 text-sm leading-relaxed pr-4">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
