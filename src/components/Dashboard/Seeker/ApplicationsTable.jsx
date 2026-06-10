import React from "react";
import { Table } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { getJobById } from "@/lib/api/jobs";
import { Building2 } from "lucide-react";

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

const getStatusStyles = (status) => {
  switch (status) {
    case "Under Review":
      return "border-orange-500 text-orange-400";
    case "Shortlisted":
      return "border-emerald-500 text-emerald-400";
    case "Rejected":
      return "border-red-500 text-red-400";
    case "Offered":
      return "border-white text-white";
    case "Applied":
    default:
      return "border-neutral-500 text-neutral-300";
  }
};

export default async function ApplicationsTable({ applications }) {
  const applicationsWithJobs = await Promise.all(
    applications.map(async (app) => {
      const job = await getJobById(app.jobId);
      return { ...app, job };
    }),
  );

  return (
    <div className="bg-[#161616] border border-neutral-800 rounded-2xl h-125 overflow-y-auto">
      <Table className="w-full text-left border-collapse relative">
        <Table.ScrollContainer>
          <Table.Content
            aria-label="Job Applications"
            className="min-w-200 w-full"
          >
            {/* Added sticky positioning to keep the header visible when scrolling */}
            <Table.Header className="border-b border-neutral-800 text-neutral-400 text-sm sticky top-0 z-10">
              <Table.Column isRowHeader className="py-4 px-6 font-medium">
                Job Title
              </Table.Column>
              <Table.Column className="py-4 px-6 font-medium">
                Company
              </Table.Column>
              <Table.Column className="py-4 px-6 font-medium">
                Applied
              </Table.Column>
              <Table.Column className="py-4 px-6 font-medium">
                Status
              </Table.Column>
              <Table.Column className="py-4 px-6 font-medium text-right">
                Action
              </Table.Column>
            </Table.Header>

            <Table.Body>
              {applicationsWithJobs.map(
                ({ _id, status, applicationDate, job }) => {
                  if (!job) return null;

                  const locationText = job.isRemote ? "Remote" : "On-site";
                  const metaText = `${job.jobType} • ${locationText}`;

                  return (
                    <Table.Row
                      key={_id}
                      className="border-b border-neutral-800/50 hover:bg-[#1A1A1A]/50 transition-colors"
                    >
                      <Table.Cell className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          {/* Removed border, background, and padding. Used object-cover */}
                          <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 flex items-center justify-center">
                            {job.companyLogo ? (
                              <Image
                                src={job.companyLogo}
                                alt={job.companyName}
                                fill
                                sizes="40px"
                                className="object-cover"
                              />
                            ) : (
                              <Building2
                                size={20}
                                className="text-neutral-500"
                              />
                            )}
                          </div>
                          <div>
                            <div className="text-white font-medium">
                              {job.jobTitle}
                            </div>
                            <div className="text-neutral-500 text-xs mt-0.5">
                              {metaText}
                            </div>
                          </div>
                        </div>
                      </Table.Cell>

                      <Table.Cell className="py-4 px-6 text-neutral-300 text-sm">
                        {job.companyName}
                      </Table.Cell>

                      <Table.Cell className="py-4 px-6 text-neutral-300 text-sm">
                        {formatDate(applicationDate)}
                      </Table.Cell>

                      <Table.Cell className="py-4 px-6">
                        <span
                          className={`px-3 py-1 text-xs font-medium border rounded-full bg-transparent ${getStatusStyles(status)}`}
                        >
                          {status}
                        </span>
                      </Table.Cell>

                      <Table.Cell className="py-4 px-6 text-right">
                        <Link
                          href={`/jobs/${job._id}`}
                          className="text-sm font-medium text-neutral-300 hover:text-white transition-colors"
                        >
                          Details
                        </Link>
                      </Table.Cell>
                    </Table.Row>
                  );
                },
              )}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
}
