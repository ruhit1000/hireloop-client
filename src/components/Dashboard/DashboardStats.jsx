import React from "react";
import { Card } from "@heroui/react";

export default function DashboardStats({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        
        return (
          <Card 
            key={index} 
            className="bg-[#161616] border border-neutral-800 p-5 flex flex-col justify-between min-h-40 rounded-xl shadow-none"
          >
            {/* Icon Wrapper */}
            <div className="w-10 h-10 rounded-lg bg-[#262626] flex items-center justify-center mb-6 border border-neutral-800/50">
              <Icon className="text-neutral-300 size-5" strokeWidth={1.5} />
            </div>
            
            {/* Text Content */}
            <div className="flex flex-col gap-1.5">
              <span className="text-xs text-neutral-400 font-medium tracking-wide">
                {stat.name}
              </span>
              <span className="text-2xl font-semibold text-white tracking-tight">
                {stat.data}
              </span>
            </div>
          </Card>
        );
      })}
    </div>
  );
}