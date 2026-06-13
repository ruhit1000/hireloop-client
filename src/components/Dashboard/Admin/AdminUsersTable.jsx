"use client";

import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { updateUserRole } from "@/lib/actions/users";
import { Button } from "@heroui/react";

const getInitials = (name) => {
  if (!name) return "U";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const formatDate = (dateString) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateString));
};

// Helper for dynamic role colors
const getRoleStyles = (role) => {
  switch (role) {
    case "admin":
      return "text-fuchsia-400 bg-fuchsia-500/10 border border-fuchsia-500/20";
    case "recruiter":
      return "text-blue-400 bg-blue-500/10 border border-blue-500/20";
    case "seeker":
      return "text-neutral-300 bg-[#23262a] border border-[#23262a]";
    default:
      return "text-neutral-300 bg-[#23262a]";
  }
};

export default function AdminUsersTable({ initialUsers = [] }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc");
  const [updatingId, setUpdatingId] = useState(null);

  // 1. Calculate Dynamic Stats
  const stats = useMemo(() => {
    const total = initialUsers.length;
    const recruiters = initialUsers.filter(
      (u) => u.role === "recruiter",
    ).length;
    const seekers = initialUsers.filter((u) => u.role === "seeker").length;

    const now = new Date();
    const newSignups = initialUsers.filter((u) => {
      const diffTime = Math.abs(now - new Date(u.createdAt));
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 7;
    }).length;

    return { total, recruiters, seekers, newSignups };
  }, [initialUsers]);

  // 2. Filter & Sort Logic
  const filteredUsers = useMemo(() => {
    return initialUsers
      .filter((user) => {
        const matchesSearch =
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = roleFilter === "all" || user.role === roleFilter;
        return matchesSearch && matchesRole;
      })
      .sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
      });
  }, [initialUsers, searchQuery, roleFilter, sortOrder]);

  // 3. Role Update Handler
  const handleRoleChange = async (userId, newRole) => {
    try {
      setUpdatingId(userId);
      await updateUserRole(userId, newRole);
      router.refresh();
    } catch (error) {
      console.error("Failed to update role:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Total Active Users",
            value: stats.total,
            sub: "Platform wide",
          },
          {
            label: "Recruiters",
            value: stats.recruiters,
            sub: "Employers & HR",
          },
          {
            label: "Job Seekers",
            value: stats.seekers,
            sub: "Active candidates",
          },
          {
            label: "New Signups (7d)",
            value: stats.newSignups,
            sub: "Recent activity",
            highlight: "text-amber-500",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-[#161719] border border-[#1f2125] rounded-xl p-5"
          >
            <h3 className="text-xs font-medium text-neutral-400 mb-2">
              {stat.label}
            </h3>
            <div className="text-2xl font-bold text-white mb-1">
              {stat.value.toLocaleString()}
            </div>
            <p
              className={`text-[11px] ${stat.highlight || "text-neutral-500"}`}
            >
              {stat.sub}
            </p>
          </div>
        ))}
      </div>

      {/* Controls Row */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:w-96">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"
            size={16}
          />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#161719] border border-[#1f2125] text-sm text-white rounded-lg pl-9 pr-4 py-2.5 focus:outline-none focus:border-neutral-600 transition-colors"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-[#161719] border border-[#1f2125] text-neutral-300 text-sm rounded-lg px-4 py-2.5 outline-none appearance-none cursor-pointer w-full sm:w-36"
          >
            <option value="all">All Roles</option>
            <option value="seeker">Seeker</option>
            <option value="recruiter">Recruiter</option>
            <option value="admin">Admin</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="bg-[#161719] border border-[#1f2125] text-neutral-300 text-sm rounded-lg px-4 py-2.5 outline-none appearance-none cursor-pointer w-full sm:w-36"
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-[#161719] border border-[#1f2125] rounded-xl overflow-hidden">
        <div className="w-full overflow-x-auto">
          <div className="min-w-225">
            {/* Header */}
            <div className="grid grid-cols-[2fr_2fr_1fr_1fr_1fr_1.5fr] gap-4 p-4 border-b border-[#1f2125] text-xs font-semibold text-neutral-400">
              <div>User Name</div>
              <div>Email Address</div>
              <div>Role</div>
              <div>Join Date</div>
              <div>Status</div>
              <div className="text-right">Actions</div>
            </div>

            {/* Body */}
            <div className="flex flex-col">
              {filteredUsers.length === 0 ? (
                <div className="p-8 text-center text-sm text-neutral-500">
                  No users found.
                </div>
              ) : (
                filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className="grid grid-cols-[2fr_2fr_1fr_1fr_1fr_1.5fr] gap-4 p-4 items-center border-b border-[#1f2125]/50 hover:bg-[#1a1b1e] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#23262a] flex items-center justify-center text-xs font-medium text-neutral-300 shrink-0">
                        {getInitials(user.name)}
                      </div>
                      <span className="text-sm font-medium text-white truncate">
                        {user.name}
                      </span>
                    </div>

                    <div className="text-sm text-neutral-400 truncate">
                      {user.email}
                    </div>

                    <div>
                      {/* Dynamic Role Pill */}
                      <span
                        className={`px-2.5 py-1 rounded-md text-[11px] font-medium capitalize flex items-center w-fit gap-1.5 ${getRoleStyles(
                          user.role,
                        )}`}
                      >
                        {user.role}
                      </span>
                    </div>

                    <div className="text-sm text-neutral-400">
                      {formatDate(user.createdAt)}
                    </div>

                    <div>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${
                          user.emailVerified
                            ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                            : "text-amber-400 bg-amber-500/10 border-amber-500/20"
                        }`}
                      >
                        {user.emailVerified ? "Verified" : "Unverified"}
                      </span>
                    </div>

                    {/* Hero UI Action Buttons */}
                    <div className="flex items-center justify-end gap-2 text-xs">
                      {user.role !== "admin" && (
                        <Button
                          size="sm"
                          variant="flat"
                          color="secondary"
                          isLoading={updatingId === user.id}
                          onPress={() => handleRoleChange(user.id, "admin")}
                          className="font-medium"
                        >
                          Admin
                        </Button>
                      )}
                      {user.role !== "recruiter" && (
                        <Button
                          size="sm"
                          variant="flat"
                          color="primary"
                          isLoading={updatingId === user.id}
                          onPress={() => handleRoleChange(user.id, "recruiter")}
                          className="font-medium"
                        >
                          Recruiter
                        </Button>
                      )}
                      {user.role !== "seeker" && (
                        <Button
                          size="sm"
                          variant="flat"
                          color="default"
                          isLoading={updatingId === user.id}
                          onPress={() => handleRoleChange(user.id, "seeker")}
                          className="font-medium bg-[#23262a] text-neutral-300"
                        >
                          Seeker
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-[#1f2125] text-xs text-neutral-500 flex justify-between items-center">
          Showing {filteredUsers.length} of {stats.total} users
        </div>
      </div>
    </div>
  );
}
