import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getJobById } from "@/lib/api/jobs";
import {
  MapPin,
  Briefcase,
  DollarSign,
  Calendar,
  Clock,
  Building2,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";

// Helper to format numbers (e.g., 90000 -> 90K)
const formatSalary = (amount) => {
  if (!amount) return "";
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(amount);
};

const JobDetailsPage = async ({ params }) => {
  const { id } = await params;
  const jobDetails = await getJobById(id);

  // Handle case if job is not found
  if (!jobDetails) {
    return (
      <div className="min-h-screen bg-[#0B0B0C] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Job Not Found</h2>
        <p className="text-neutral-400 mb-6">
          The job you are looking for does not exist or has been removed.
        </p>
        <Link
          href="/jobs"
          className="bg-[#6366f1] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-500 transition-colors"
        >
          Browse All Jobs
        </Link>
      </div>
    );
  }

  const salaryString =
    jobDetails.minSalary && jobDetails.maxSalary
      ? `${formatSalary(jobDetails.minSalary)} - ${formatSalary(jobDetails.maxSalary)} ${jobDetails.currency}`
      : "Salary Undisclosed";

  const locationString = jobDetails.isRemote ? "Remote" : "On-site";

  return (
    <div className="min-h-screen bg-[#0B0B0C] text-neutral-200 p-4 pt-25 md:p-8 md:pt-25">
      <div className="max-w-6xl mx-auto w-full">
        {/* Back Navigation */}
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 text-sm font-medium text-neutral-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to jobs
        </Link>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Column (Takes 2/3 on Desktop) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header / Hero Section */}
            <div className="bg-[#161616] border border-neutral-800 rounded-3xl p-6 md:p-8">
              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center mb-8">
                {/* Company Logo Wrapper */}
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-[#222222] border border-neutral-700 shrink-0 flex items-center justify-center">
                  {jobDetails.companyLogo ? (
                    <Image
                      src={jobDetails.companyLogo}
                      alt={jobDetails.companyName || "Company logo"}
                      fill
                      sizes="80px"
                      className="object-contain p-2"
                    />
                  ) : (
                    <Building2 size={32} className="text-neutral-500" />
                  )}
                </div>

                {/* Job Titles & Meta */}
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">
                    {jobDetails.jobTitle}
                  </h1>
                  <div className="flex flex-wrap items-center gap-3 text-neutral-400 text-sm">
                    <span className="font-semibold text-neutral-200">
                      {jobDetails.companyName}
                    </span>
                    <span className="hidden sm:inline">•</span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={14} /> Posted {jobDetails.postedDate}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Info Tags */}
              <div className="flex flex-wrap gap-3">
                <span className="flex items-center gap-2 px-4 py-2 bg-[#222222] border border-neutral-700 rounded-xl text-sm font-medium text-white">
                  <Briefcase size={16} className="text-fuchsia-400" />
                  {jobDetails.jobType}
                </span>
                <span className="flex items-center gap-2 px-4 py-2 bg-[#222222] border border-neutral-700 rounded-xl text-sm font-medium text-white">
                  <MapPin size={16} className="text-fuchsia-400" />
                  {locationString}
                </span>
                <span className="flex items-center gap-2 px-4 py-2 bg-[#222222] border border-neutral-700 rounded-xl text-sm font-medium text-white">
                  <DollarSign size={16} className="text-fuchsia-400" />
                  {salaryString}
                </span>
              </div>
            </div>

            {/* Content Sections */}
            <div className="space-y-8 px-1">
              <section>
                <h2 className="text-xl font-bold text-white mb-4">
                  About the Role
                </h2>
                <p className="text-neutral-400 leading-relaxed text-[15px]">
                  {jobDetails.responsibilities}
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-4">
                  Requirements
                </h2>
                <div className="bg-[#161616] border border-neutral-800 rounded-2xl p-6">
                  <p className="text-neutral-400 leading-relaxed text-[15px]">
                    {jobDetails.requirements}
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-4">
                  Benefits & Perks
                </h2>
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    size={20}
                    className="text-emerald-500 shrink-0 mt-0.5"
                  />
                  <p className="text-neutral-400 leading-relaxed text-[15px]">
                    {jobDetails.benefits}
                  </p>
                </div>
              </section>
            </div>
          </div>

          {/* Sticky Sidebar Column (Takes 1/3 on Desktop) */}
          <div className="lg:col-span-1">
            <div className="bg-[#161616] border border-neutral-800 rounded-3xl p-6 sticky top-6">
              <h3 className="text-lg font-bold text-white mb-6">Job Summary</h3>

              <div className="space-y-2 mb-8">
                <div className="flex items-center justify-between py-3 border-b border-neutral-800">
                  <span className="text-neutral-500 text-sm">Category</span>
                  <span className="font-medium text-white text-sm text-right">
                    {jobDetails.jobCategory}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-neutral-800">
                  <span className="text-neutral-500 text-sm">Location</span>
                  <span className="font-medium text-white text-sm">
                    {locationString}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-neutral-800">
                  <span className="text-neutral-500 text-sm">Status</span>
                  <span className="font-medium text-emerald-400 text-sm flex items-center gap-1.5 capitalize">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    {jobDetails.jobStatus}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-neutral-500 text-sm">Deadline</span>
                  <span className="font-medium text-red-400 text-sm flex items-center gap-1.5">
                    <Calendar size={14} /> {jobDetails.deadline}
                  </span>
                </div>
              </div>

              <Link
                href={`/jobs/${jobDetails._id}/apply`}
                className="flex items-center justify-center w-full bg-linear-to-r from-sky-500 to-orange-500 hover:from-sky-400 hover:to-orange-400 text-white font-bold py-3.5 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.4)] active:scale-[0.98]"
              >
                Apply Now
              </Link>

              <p className="text-center text-neutral-500 text-xs mt-4">
                You will be redirected to the application form.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
