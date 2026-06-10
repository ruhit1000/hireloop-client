"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Briefcase,
  FileText,
  Settings,
  Search,
  Bookmark,
  CreditCard, 
  Users, 
} from "lucide-react";

const DashboardNavLinks = ({ role }) => {
  const pathname = usePathname();

  const recruiterNavItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      pathname: "/dashboard/recruiter",
    },
    {
      icon: Building2,
      label: "My Company",
      pathname: "/dashboard/recruiter/company",
    },
    {
      icon: Briefcase,
      label: "Manage Jobs",
      pathname: "/dashboard/recruiter/jobs",
    },
    {
      icon: FileText,
      label: "Applications",
      pathname: "/dashboard/applications",
    },
    { icon: Settings, label: "Settings", pathname: "/dashboard/settings" },
  ];

  const seekerNavItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      pathname: "/dashboard/seeker",
    },
    {
      icon: Search,
      label: "Jobs",
      pathname: "/jobs",
    },
    {
      icon: Bookmark,
      label: "Saved Jobs",
      pathname: "/dashboard/seeker/saved-jobs",
    },
    {
      icon: FileText,
      label: "Applications",
      pathname: "/dashboard/seeker/applications",
    },
    {
      icon: CreditCard,
      label: "Billing",
      pathname: "/dashboard/seeker/billing",
    },
    {
      icon: Settings,
      label: "Settings",
      pathname: "/dashboard/seeker/settings",
    },
  ];

  const adminNavItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      pathname: "/dashboard/admin",
    },
    {
      icon: Users,
      label: "Users",
      pathname: "/dashboard/admin/users",
    },
    {
      icon: Building2,
      label: "Companies",
      pathname: "/dashboard/admin/companies",
    },
    {
      icon: Briefcase,
      label: "Jobs",
      pathname: "/dashboard/admin/jobs",
    },
    {
      icon: CreditCard,
      label: "Payments",
      pathname: "/dashboard/admin/payments",
    },
    {
      icon: Settings,
      label: "Settings",
      pathname: "/dashboard/admin/settings",
    },
  ];

  const navItemsMap = {
    recruiter: recruiterNavItems,
    seeker: seekerNavItems,
    admin: adminNavItems,
  };

  const navItems = navItemsMap[role || "seeker"];

  return (
    <nav className="flex flex-col gap-1 px-4">
      {navItems.map((item) => {
        const isActive = pathname === item.pathname;

        return (
          <Link
            key={item.label}
            href={item.pathname}
            className={`flex items-center gap-4 px-4 py-3 text-sm font-medium transition-colors ${
              isActive
                ? "bg-[#262626] text-white border-r-[3px] border-white"
                : "text-neutral-400 hover:bg-[#1A1A1A] hover:text-neutral-200"
            }`}
          >
            <item.icon className="w-5 h-5 shrink-0" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};

export default DashboardNavLinks;
