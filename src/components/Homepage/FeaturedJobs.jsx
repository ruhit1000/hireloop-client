import React from 'react';
import Link from 'next/link';
import { getFeaturedJobs } from '@/lib/api/jobs';
import JobCard from '../AllJobs/JobCard';

const FeaturedJobs = async () => {
    const featuredJobs = await getFeaturedJobs();
    
    return (
        <section className="bg-[#0B0B0C] py-20 px-6">
            <div className="max-w-6xl mx-auto w-full flex flex-col items-center">
                
                {/* Section Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <span className="w-1.5 h-1.5 bg-[#4F46E5] rounded-sm"></span>
                        <span className="text-neutral-400 text-xs font-semibold tracking-[0.2em] uppercase">
                            Smart Job Discovery
                        </span>
                        <span className="w-1.5 h-1.5 bg-[#4F46E5] rounded-sm"></span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-semibold text-white max-w-xl mx-auto leading-tight tracking-tight">
                        The roles you&apos;d never find by searching
                    </h2>
                </div>

                {/* 3-Column Job Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mb-12">
                    {featuredJobs?.map((job) => (
                        <JobCard key={job._id} job={job} />
                    ))}
                </div>

                {/* Bottom CTA Button */}
                <Link 
                    href="/jobs" 
                    className="bg-white text-black font-semibold text-sm px-8 py-3 rounded-xl hover:bg-neutral-200 transition-colors"
                >
                    View all job open
                </Link>

            </div>
        </section>
    );
};

export default FeaturedJobs;