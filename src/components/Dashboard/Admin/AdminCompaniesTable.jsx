"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { Table, Pagination, Toast, toast } from "@heroui/react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { updateCompany } from "@/lib/actions/companies";

// Helper to extract initials (e.g., "Vertex Tech" -> "VT")
const getInitials = (name) => {
  if (!name) return "";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

// Helper for formatting dates to look clean and premium
const formatDate = (dateString) => {
  if (!dateString) return "Jun 10, 2026";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(date);
};

export default function AdminCompaniesTable({ data, emails }) {
  const router = useRouter();
  const pathname = usePathname();

  const { companies, pagination } = data;
  const { page, totalPages, totalItems, limit, currentStatus } = pagination;

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", newPage);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleStatusFilter = (status) => {
    const params = new URLSearchParams(window.location.search);
    params.set("status", status);
    params.set("page", "1");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleApprove = async (companyId) => {
    console.log("Approve company:", companyId);
    const res = await updateCompany(companyId, { companyStatus: "approved" });
    if (res.acknowledged) {
      toast.success("Company approved successfully!");
      router.refresh();
    } else {
      toast.error(res.error);
    }
  };

  const handleReject = async (companyId) => {
    console.log("Reject company:", companyId);
    const res = await updateCompany(companyId, { companyStatus: "rejected" });
    if (res.acknowledged) {
      toast.success("Company rejected successfully!");
      router.refresh();
    } else {
      toast.error(res.error);
    }
  };

  const startItem = (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, totalItems);

  return (
    <div className="space-y-5 w-full">
      {/* Premium Navigation Filter Tabs */}
      <Toast.Provider />
      <div className="flex items-center gap-1.5 border-b border-[#1f2125] pb-3">
        {["all", "pending", "approved", "rejected"].map((status) => (
          <button
            key={status}
            onClick={() => handleStatusFilter(status)}
            className={`px-4 py-2 text-xs font-semibold rounded-xl capitalize transition-all cursor-pointer ${
              currentStatus === status
                ? "bg-white text-black shadow-md shadow-white/5"
                : "bg-transparent text-neutral-400 hover:text-white hover:bg-[#161618]"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Main Table Container - Fixed Height with custom scrollbar properties */}
      <div className="bg-[#111214] border border-[#1f2125] rounded-2xl h-112.5 overflow-y-auto relative scrollbar-thin scrollbar-thumb-neutral-800">
        <Table className="w-full text-left border-collapse">
          <Table.ScrollContainer>
            <Table.Content
              aria-label="Company Workspace Grid"
              className="min-w-250 w-full"
            >
              {/* Sticky Table Header */}
              <Table.Header className="bg-[#161719] border-b border-[#1f2125] text-neutral-400 text-xs uppercase tracking-wider sticky top-0 z-20 shadow-sm">
                <Table.Column isRowHeader className="py-4 px-6 font-semibold">
                  Company Name
                </Table.Column>
                <Table.Column className="py-4 px-6 font-semibold">
                  Recruiter Email
                </Table.Column>
                <Table.Column className="py-4 px-6 font-semibold">
                  Industry
                </Table.Column>
                <Table.Column className="py-4 px-6 font-semibold">
                  Status
                </Table.Column>
                <Table.Column className="py-4 px-6 font-semibold">
                  Date Submitted
                </Table.Column>
                <Table.Column className="py-4 px-6 font-semibold text-right">
                  Actions
                </Table.Column>
              </Table.Header>

              <Table.Body>
                {companies.map((company) => {
                  const status = company.companyStatus || "pending";
                  const email = emails[company.recruiterId] || "fetching...";

                  return (
                    <Table.Row
                      key={company._id}
                      className="border-b border-[#1f2125]/40 hover:bg-[#161719]/40 transition-colors duration-150"
                    >
                      {/* Logo and Name Block */}
                      <Table.Cell className="py-4 px-6">
                        <div className="flex items-center gap-3.5">
                          <div className="relative w-9 h-9 rounded-xl bg-[#161719] overflow-hidden shrink-0 flex items-center justify-center">
                            {company.logo ? (
                              <Image
                                src={company.logo}
                                alt={company.name || "Company Logo"}
                                fill
                                sizes="36px"
                                className="object-cover"
                              />
                            ) : (
                              <span className="text-[11px] font-bold text-neutral-400 tracking-wider">
                                {getInitials(company.name)}
                              </span>
                            )}
                          </div>
                          <span className="text-white font-medium text-sm">
                            {company.name}
                          </span>
                        </div>
                      </Table.Cell>

                      {/* Recruiter Email */}
                      <Table.Cell className="py-4 px-6 text-neutral-400 text-sm font-light">
                        {email}
                      </Table.Cell>

                      {/* Industry Pill Badge */}
                      <Table.Cell className="py-4 px-6">
                        <span className="bg-[#161719] text-neutral-300 text-xs px-3 py-1.5 rounded-xl border border-[#23262a] font-medium">
                          {company.industry || "Technology"}
                        </span>
                      </Table.Cell>

                      {/* Sleek Row Status Tags */}
                      <Table.Cell className="py-4 px-6 text-xs font-semibold tracking-wide">
                        {status === "approved" && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                            <span className="w-1 h-1 rounded-full bg-emerald-400"></span>
                            Approved
                          </span>
                        )}
                        {status === "rejected" && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
                            <span className="w-1 h-1 rounded-full bg-red-400"></span>
                            Rejected
                          </span>
                        )}
                        {status === "pending" && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
                            <span className="w-1 h-1 rounded-full bg-amber-400"></span>
                            Pending
                          </span>
                        )}
                      </Table.Cell>

                      {/* Submission Date */}
                      <Table.Cell className="py-4 px-6 text-neutral-400 text-sm font-light">
                        {formatDate(
                          company.createdAt || company.applicationDate,
                        )}
                      </Table.Cell>

                      {/* Premium Dynamic Action Buttons */}
                      <Table.Cell className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {(status === "pending" || status === "rejected") && (
                            <button
                              onClick={() => handleApprove(company._id)}
                              className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-white text-xs font-semibold rounded-lg transition-all cursor-pointer"
                            >
                              Approve
                            </button>
                          )}
                          {(status === "pending" || status === "approved") && (
                            <button
                              onClick={() => handleReject(company._id)}
                              className="px-3 py-1.5 bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white text-xs font-semibold rounded-lg transition-all cursor-pointer"
                            >
                              Reject
                            </button>
                          )}
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </div>

      {/* Full Width Layout: Left Metrics Summary & Right Pagination Navigation Alignment */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 w-full items-center border-t border-[#1f2125]/40">
        {/* Left Side: Summary Text */}
        <div className="text-xs text-neutral-500 text-center sm:text-left">
          Showing{" "}
          <span className="text-neutral-300 font-medium">
            {startItem}-{endItem}
          </span>{" "}
          of <span className="text-neutral-300 font-medium">{totalItems}</span>{" "}
          companies
        </div>

        {/* Right Side: Pagination Controls Wrapper */}
        <div className="mx-auto sm:mx-0 sm:justify-self-end">
          <Pagination className="flex items-center gap-1">
            <Pagination.Content className="flex items-center gap-1">
              <Pagination.Item>
                <button
                  disabled={page === 1}
                  onClick={() => handlePageChange(page - 1)}
                  className="w-8 h-8 flex items-center justify-center border border-[#1f2125] bg-[#111214] text-neutral-400 hover:text-white rounded-xl disabled:opacity-20 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  <ChevronLeft size={14} />
                </button>
              </Pagination.Item>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Pagination.Item key={p}>
                  <button
                    onClick={() => handlePageChange(p)}
                    className={`w-8 h-8 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      p === page
                        ? "bg-white text-black shadow-md shadow-white/5"
                        : "border border-[#1f2125] bg-[#111214] text-neutral-400 hover:text-white hover:bg-[#161719]"
                    }`}
                  >
                    {p}
                  </button>
                </Pagination.Item>
              ))}

              <Pagination.Item>
                <button
                  disabled={page === totalPages}
                  onClick={() => handlePageChange(page + 1)}
                  className="w-8 h-8 flex items-center justify-center border border-[#1f2125] bg-[#111214] text-neutral-400 hover:text-white rounded-xl disabled:opacity-20 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  <ChevronRight size={14} />
                </button>
              </Pagination.Item>
            </Pagination.Content>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
