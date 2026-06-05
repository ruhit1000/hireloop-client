import React from "react";
import { Avatar } from "@heroui/react";
import { Search, Bell } from "lucide-react";
import { DashBoardSidebar } from "./DashboardSidebar";
import DashboardNavLinks from "./Recruiter/DashboardNavLinks";

const DashBoardNavbar = ({ children }) => {
  return (
    <div className="flex h-screen bg-[#0B0B0C] overflow-hidden">
      {/* Left Sidebar - Full Height */}
      <aside className="hidden lg:block w-64 border-r border-neutral-800 py-6 h-full shrink-0">
        <div className="mb-6 px-6">
          <h3 className="text-lg font-bold text-white mb-5 text-center">
            Dashboard
          </h3>
        </div>
        <DashboardNavLinks />
      </aside>

      {/* Right Content Area */}
      <div className="flex-1 flex flex-col w-full overflow-hidden">
        {/* Top Navbar */}
        <header className="flex items-center justify-between w-full px-6 py-4 bg-[#0B0B0C] border-b border-neutral-900 shrink-0">
          {/* Search Input */}
          <div className="flex items-center gap-4">
            <DashBoardSidebar />
            <div className="flex items-center md:w-2xl bg-[#161616] border border-neutral-800 hover:border-neutral-700 rounded-lg h-10 px-3 transition-colors">
              <Search className="text-neutral-500 shrink-0" size={18} />
              <input
                type="text"
                placeholder="Search applications, jobs, or talent..."
                className="w-full bg-transparent text-sm text-white placeholder-neutral-500 outline-none ml-3"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-6 ml-4">

            {/* Vertical Divider */}
            <div className="w-px h-8 bg-neutral-800"></div>

            {/* User Profile Info */}
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium text-white group-hover:text-indigo-400 transition-colors">
                  Alex Sterling
                </span>
                <span className="text-xs text-neutral-500">TechFlow Inc.</span>
              </div>

              <Avatar
                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                size="sm"
                className="border border-neutral-700"
              />
            </div>
          </div>
        </header>

        {/* Dynamic Content Area */}
        <main className="flex-1 overflow-y-auto bg-[#0B0B0C]">{children}</main>
      </div>
    </div>
  );
};

export default DashBoardNavbar;
