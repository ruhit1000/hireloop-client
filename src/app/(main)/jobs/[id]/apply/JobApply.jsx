"use client";

import React, { useState } from "react";
import {
  User,
  Mail,
  Link as LinkIcon,
  FileText,
  Send,
  Briefcase,
} from "lucide-react";
import { submitApplication } from "@/lib/actions/applications";
import { toast, Toast } from "@heroui/react";
import { useRouter } from "next/navigation";

const JobApply = ({ jobDetails, applicant }) => {
    const router = useRouter();
  const [formData, setFormData] = useState({
    resumeLink: "",
    portfolioLink: "",
    coverLetter: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const applicationData = {
        ...formData,
        applicantId: applicant.id,
        applicantName: applicant.name,
        applicantEmail: applicant.email,
        jobId: jobDetails._id,
        jobTitle: jobDetails.jobTitle,
        companyName: jobDetails.companyName,
        companyId: jobDetails.companyId,
        status: "Applied",
    }
    const res = await submitApplication(applicationData);
    if (res.acknowledged) {
        toast.success("Application submitted successfully!");
        setFormData({
            resumeLink: "",
            portfolioLink: "",
            coverLetter: "",
        });
        setTimeout(() => {
            router.push(`/jobs/${jobDetails._id}`);
        }, 2000);
    }
  };

  return (
    <div className="px-4 flex justify-center items-start">
        <Toast.Provider />
      <div className="max-w-2xl w-full">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">
            Submit Application
          </h1>
          <p className="text-neutral-400 flex items-center justify-center gap-2">
            <Briefcase size={16} />
            Applying for{" "}
            <span className="font-semibold text-white">
              {jobDetails?.jobTitle || "Job Role"}
            </span>{" "}
            at {jobDetails?.companyName || "Company"}
          </p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#161616] border border-neutral-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl"
        >
          {/* Read-Only Profile Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-400">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-neutral-500" />
                </div>
                <input
                  type="text"
                  value={applicant?.name || ""}
                  disabled
                  className="w-full bg-[#222222] border border-neutral-700 text-neutral-500 rounded-xl pl-10 pr-4 py-3 text-sm cursor-not-allowed outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-400">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-neutral-500" />
                </div>
                <input
                  type="email"
                  value={applicant?.email || ""}
                  disabled
                  className="w-full bg-[#222222] border border-neutral-700 text-neutral-500 rounded-xl pl-10 pr-4 py-3 text-sm cursor-not-allowed outline-none"
                />
              </div>
            </div>
          </div>

          <hr className="border-neutral-800" />

          {/* Required Fields */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-300">
              Resume Link <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LinkIcon size={18} className="text-neutral-500" />
              </div>
              <input
                type="url"
                required
                placeholder="Google Drive or Dropbox link to your resume"
                value={formData.resumeLink}
                onChange={(e) =>
                  setFormData({ ...formData, resumeLink: e.target.value })
                }
                className="w-full bg-[#222222] border border-neutral-700 text-white rounded-xl pl-10 pr-4 py-3 text-sm focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all placeholder:text-neutral-600"
              />
            </div>
          </div>

          {/* Optional Fields */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-300">
              Portfolio / GitHub URL{" "}
              <span className="text-neutral-500 text-xs ml-1">(Optional)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LinkIcon size={18} className="text-neutral-500" />
              </div>
              <input
                type="url"
                placeholder="e.g., github.com/ruhit1000"
                value={formData.portfolioLink}
                onChange={(e) =>
                  setFormData({ ...formData, portfolioLink: e.target.value })
                }
                className="w-full bg-[#222222] border border-neutral-700 text-white rounded-xl pl-10 pr-4 py-3 text-sm focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all placeholder:text-neutral-600"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-300">
              Cover Letter / Note{" "}
              <span className="text-neutral-500 text-xs ml-1">(Optional)</span>
            </label>
            <div className="relative">
              <div className="absolute top-3 left-3 pointer-events-none">
                <FileText size={18} className="text-neutral-500" />
              </div>
              <textarea
                rows={4}
                placeholder="Why are you a great fit for this role?"
                value={formData.coverLetter}
                onChange={(e) =>
                  setFormData({ ...formData, coverLetter: e.target.value })
                }
                className="w-full bg-[#222222] border border-neutral-700 text-white rounded-xl pl-10 pr-4 py-3 text-sm focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all placeholder:text-neutral-600 resize-y"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="flex items-center justify-center gap-2 w-full bg-linear-to-r from-sky-500 to-orange-500 hover:from-sky-400 hover:to-orange-400 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(14,165,233,0.2)] hover:shadow-[0_0_30px_rgba(249,115,22,0.3)] active:scale-[0.98] mt-4 cursor-pointer"
          >
            <Send size={18} />
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobApply;
