"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Upload, X, MapPin, ChevronDown, Loader2 } from "lucide-react";
import Link from "next/link";

const AddNewCompanyPage = () => {
  const [logoFile, setLogoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.target);
    const companyData = Object.fromEntries(formData.entries());

    try {
      if (logoFile) {
        const imgData = new FormData();
        imgData.append("image", logoFile);

        // REPLACE WITH YOUR IMGBB KEY
        const imgResponse = await fetch(
          `https://api.imgbb.com/1/upload?key=YOUR_IMGBB_API_KEY`,
          {
            method: "POST",
            body: imgData,
          },
        );

        const imgJson = await imgResponse.json();
        if (imgJson.success) {
          companyData.logo = imgJson.data.display_url;
        }
      }

      console.log("Final Company Data:", companyData);
      // Proceed with saving to your database here
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const labelClass = "block text-sm font-medium text-neutral-300 mb-1.5";
  const inputClass =
    "w-full bg-[#222222] border border-neutral-700 hover:border-neutral-500 focus:border-white focus:outline-none text-white px-3 py-2.5 rounded-lg text-sm transition-colors placeholder:text-neutral-500";

  return (
    <div className="min-h-screen bg-[#0B0B0C] flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-[#161616] border border-neutral-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="flex justify-between items-start p-6 border-b border-neutral-800">
          <div>
            <h2 className="text-xl font-semibold text-white">
              Register New Company
            </h2>
            <p className="text-sm text-neutral-400 mt-1">
              Enter your business details to start hiring on HireLoop.
            </p>
          </div>
          <button className="text-neutral-500 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-6 flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <div>
              <label className={labelClass}>Company Name</label>
              <input
                required
                name="name"
                type="text"
                placeholder="e.g. Acme Corp"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Industry / Category</label>
              <div className="relative">
                <select
                  required
                  name="industry"
                  defaultValue=""
                  className={`${inputClass} appearance-none pr-10 cursor-pointer`}
                >
                  <option value="" disabled>
                    Select industry
                  </option>
                  <option value="Technology">Technology</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Finance">Finance</option>
                  <option value="Education">Education</option>
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
                  size={16}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Website URL</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-neutral-700 bg-[#1A1A1A] text-neutral-500 text-sm">
                  https://
                </span>
                <input
                  name="website"
                  type="text"
                  placeholder="www.company.com"
                  className={`${inputClass} rounded-l-none`}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Location</label>
              <div className="relative">
                <MapPin
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"
                  size={16}
                />
                <input
                  required
                  name="location"
                  type="text"
                  placeholder="City, Country"
                  className={`${inputClass} pl-9`}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Employee Count Range</label>
              <div className="relative">
                <select
                  required
                  name="employeeCount"
                  defaultValue=""
                  className={`${inputClass} appearance-none pr-10 cursor-pointer`}
                >
                  <option value="" disabled>
                    Select range
                  </option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201+">201+ employees</option>
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
                  size={16}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>Company Logo</label>
              <div className="flex items-center gap-4">
                <label className="relative flex items-center justify-center w-16 h-16 bg-[#222222] border border-neutral-700 border-dashed rounded-lg cursor-pointer hover:border-neutral-500 transition-colors overflow-hidden shrink-0">
                  <input
                    type="file"
                    name="logoFile"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  {previewUrl ? (
                    <Image
                      src={previewUrl}
                      alt="Logo preview"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  ) : (
                    <Upload size={20} className="text-neutral-400" />
                  )}
                </label>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-white">
                    Upload image
                  </span>
                  <span className="text-xs text-neutral-500">
                    PNG, JPG up to 5MB
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className={labelClass}>Brief Description</label>
            <textarea
              required
              name="description"
              rows="4"
              placeholder="Tell us about your company's mission and culture..."
              className={`${inputClass} resize-y`}
            ></textarea>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-neutral-800 w-full mt-2">
            <Link
              href="/dashboard/recruiter/company"
              type="button"
              className="px-5 py-2.5 rounded-lg border border-neutral-700 text-sm font-medium text-white hover:bg-[#222222] transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center justify-center min-w-35 px-5 py-2.5 rounded-lg bg-white text-black text-sm font-semibold hover:bg-neutral-200 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="animate-spin text-black" size={18} />
              ) : (
                "Register Company"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewCompanyPage;
