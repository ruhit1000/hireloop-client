import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import RecruiterJobList from "@/components/Dashboard/RecruiterJobList";


export default function RecruiterJobs() {
  // Dummy data to feed the list component
  const dummyJobs = [
    { 
      id: 1, 
      title: "Senior Frontend Developer", 
      type: "Full-time", 
      location: "Remote", 
      postedDate: "Oct 24, 2023", 
      applicants: 45, 
      status: "Active" 
    },
    { 
      id: 2, 
      title: "Product Designer", 
      type: "Contract", 
      location: "New York, NY", 
      postedDate: "Oct 20, 2023", 
      applicants: 12, 
      status: "Active" 
    },
    { 
      id: 3, 
      title: "Backend Engineer", 
      type: "Full-time", 
      location: "Remote", 
      postedDate: "Sep 15, 2023", 
      applicants: 128, 
      status: "Closed" 
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto w-full">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Manage Jobs</h1>
          <p className="text-sm text-neutral-400">View, edit, and manage all your job postings.</p>
        </div>
        
        <Link 
          href="/dashboard/recruiter/jobs/new"
          className="flex items-center justify-center gap-2 bg-[#6366f1] hover:bg-indigo-500 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus size={18} />
          Add New Job
        </Link>
      </div>

      {/* Jobs List Section */}
      <section>
        <RecruiterJobList jobs={dummyJobs} />
      </section>

    </div>
  );
}