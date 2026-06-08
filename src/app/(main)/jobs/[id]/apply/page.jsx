import { getJobById } from '@/lib/api/jobs';
import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import React from 'react';
import JobApply from './JobApply';

const ApplyPage = async ({params}) => {
    const {id} = await params;

    const user = await getUserSession();
    
    if (!user) {
        redirect(`/signin?redirect=/jobs/${id}/apply`);
    }

    if (user.role !== 'seeker') {
        return (
            <div className="min-h-screen bg-[#0B0B0C] flex flex-col items-center justify-center p-6 text-center">
                <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
                <p className="text-neutral-400 mb-6">
                    Only job seekers can apply for jobs. Please sign in with a seeker account to proceed.
                </p>
            </div>
        );
    }

    const jobDetails = await getJobById(id);

    return (
        <div>
            <JobApply jobDetails={jobDetails} applicant={user} />
        </div>
    );
};

export default ApplyPage;