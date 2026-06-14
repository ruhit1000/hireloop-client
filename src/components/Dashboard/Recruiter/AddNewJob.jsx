"use client";

import React, { useState } from "react";
import {
  Briefcase,
  MapPin,
  DollarSign,
  Calendar,
  AlignLeft,
  Check,
} from "lucide-react";
import { createJob } from "@/lib/actions/jobs";
import { toast} from "@heroui/react";
import { redirect } from "next/navigation";

const AddNewJob = ({ company }) => {
  const [isRemote, setIsRemote] = useState(false);
  const inputMinDate = new Date().toISOString().split("T")[0];
  const postedDate = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const companyId = company._id;
  const companyName = company.name;
  const companyLogo = company.logo;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    let jobData = Object.fromEntries(formData.entries());

    // Explicitly add the remote status to our collected data
    jobData.isRemote = isRemote;
    jobData.companyId = companyId; // Associate the job with the company ID
    jobData.postedDate = postedDate; // Add the posted date to the job data
    jobData.jobStatus = "active"; // Default status for new job posts
    const deadlineDate = new Date(jobData.deadline);
    jobData.deadline = deadlineDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    jobData.companyName = companyName;
    jobData.companyLogo = companyLogo;

    const res = await createJob(jobData);

    if (res.acknowledged) {
      toast.success("Job posted successfully!");
      e.target.reset();
      setIsRemote(false);
      redirect("/dashboard/recruiter/jobs");
    } else {
      toast.danger("Failed to post job. Please try again.");
    }
  };

  const inputStyles =
    "w-full bg-[#0B0B0C] border border-neutral-800 rounded-lg p-3 text-sm text-white placeholder-neutral-500 focus:border-indigo-500 focus:outline-none transition-colors";
  const labelStyles = "block text-sm font-medium text-neutral-300 mb-1.5";

  return (
    <div className="p-6 max-w-4xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Post a New Job</h1>
        <p className="text-sm text-neutral-400">
          Fill out the details below to publish your job listing.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        {/* SECTION 1: Job Info */}
        <section className="bg-[#161616] border border-neutral-800 rounded-xl p-6 md:p-8">
          <div className="flex items-center gap-2 mb-6 border-b border-neutral-800 pb-4">
            <Briefcase className="text-indigo-400" size={20} />
            <h2 className="text-lg font-semibold text-white">
              Job Information
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className={labelStyles}>Job Title</label>
              <input
                required
                name="jobTitle"
                type="text"
                placeholder="e.g. Senior React Developer"
                className={inputStyles}
              />
            </div>

            <div>
              <label className={labelStyles}>Job Category</label>
              <input
                required
                name="jobCategory"
                type="text"
                placeholder="e.g. Software Engineering"
                className={inputStyles}
              />
            </div>

            <div>
              <label className={labelStyles}>Job Type</label>
              <select
                required
                name="jobType"
                className={`${inputStyles} appearance-none`}
              >
                <option value="">Select Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            {/* Salary Range */}
            <div className="md:col-span-2 grid grid-cols-3 gap-4">
              <div>
                <label className={labelStyles}>Min Salary</label>
                <div className="relative">
                  <DollarSign
                    className="absolute left-3 top-3 text-neutral-500"
                    size={16}
                  />
                  <input
                    required
                    name="minSalary"
                    type="number"
                    placeholder="60,000"
                    className={`${inputStyles} pl-9`}
                  />
                </div>
              </div>
              <div>
                <label className={labelStyles}>Max Salary</label>
                <div className="relative">
                  <DollarSign
                    className="absolute left-3 top-3 text-neutral-500"
                    size={16}
                  />
                  <input
                    required
                    name="maxSalary"
                    type="number"
                    placeholder="120,000"
                    className={`${inputStyles} pl-9`}
                  />
                </div>
              </div>
              <div>
                <label className={labelStyles}>Currency</label>
                <select
                  name="currency"
                  className={`${inputStyles} appearance-none`}
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="BDT">BDT (৳)</option>
                </select>
              </div>
            </div>

            {/* Location */}
            <div className="md:col-span-2 border border-neutral-800 rounded-lg p-4 bg-[#0B0B0C]">
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-medium text-white flex items-center gap-2">
                  <MapPin size={16} className="text-neutral-400" /> Location
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-indigo-500 rounded border-neutral-700 bg-[#161616]"
                    checked={isRemote}
                    onChange={(e) => setIsRemote(e.target.checked)}
                  />
                  <span className="text-sm text-neutral-300">Fully Remote</span>
                </label>
              </div>

              {!isRemote && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    required={!isRemote}
                    name="city"
                    type="text"
                    placeholder="City"
                    className={inputStyles}
                  />
                  <input
                    required={!isRemote}
                    name="country"
                    type="text"
                    placeholder="Country"
                    className={inputStyles}
                  />
                </div>
              )}
            </div>

            <div className="md:col-span-2">
              <label className={labelStyles}>Application Deadline</label>
              <div className="relative">
                <Calendar
                  className="absolute left-3 top-3 text-neutral-500"
                  size={16}
                />
                <input
                  required
                  name="deadline"
                  type="date"
                  min={inputMinDate}
                  className={`${inputStyles} pl-9`}
                />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Job Description */}
        <section className="bg-[#161616] border border-neutral-800 rounded-xl p-6 md:p-8">
          <div className="flex items-center gap-2 mb-6 border-b border-neutral-800 pb-4">
            <AlignLeft className="text-indigo-400" size={20} />
            <h2 className="text-lg font-semibold text-white">
              Job Description
            </h2>
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <label className={labelStyles}>Responsibilities</label>
              <textarea
                required
                name="responsibilities"
                rows="4"
                placeholder="What will this person do day-to-day?"
                className={inputStyles}
              ></textarea>
            </div>

            <div>
              <label className={labelStyles}>Requirements</label>
              <textarea
                required
                name="requirements"
                rows="4"
                placeholder="Required skills, education, and experience..."
                className={inputStyles}
              ></textarea>
            </div>

            <div>
              <label className={labelStyles}>Benefits (Optional)</label>
              <textarea
                name="benefits"
                rows="3"
                placeholder="Health insurance, PTO, gym memberships..."
                className={inputStyles}
              ></textarea>
            </div>
          </div>
        </section>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-4 mt-2 border-t border-neutral-800 pt-6">
          <button
            type="button"
            className="px-6 py-2.5 rounded-lg text-sm font-medium text-neutral-300 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-8 py-2.5 bg-[#6366f1] hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-colors border-none"
          >
            <Check size={18} />
            Post Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewJob;
