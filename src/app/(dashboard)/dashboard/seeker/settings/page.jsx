import React from "react";
import ProfileInformation from "@/components/Dashboard/Seeker/ProfileInformation";
import ResumeUpload from "@/components/Dashboard/Seeker/ResumeUpload";
import ProfessionalDetails from "@/components/Dashboard/Seeker/ProfessionalDetails";
import MaintenanceAlert from "@/components/MaintenanceAlert";

export default function SeekerSettingsPage() {
  return (
    <div className="min-h-screen bg-[#0B0B0C] text-white p-6">
      <MaintenanceAlert pageName="Settings" />

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="border-b border-neutral-900 pb-6">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Settings</h1>
          <p className="text-sm text-neutral-400">
            Manage your account details and professional profile.
          </p>
        </div>

        {/* Top Responsive Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2">
            <ProfileInformation />
          </div>
          <div className="lg:col-span-1">
            <ResumeUpload />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="max-w-[72.5%] lg:max-w-full">
          <ProfessionalDetails />
        </div>
      </div>
    </div>
  );
}