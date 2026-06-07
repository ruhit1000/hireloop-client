const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getCompanyJobs = async (companyId, status = "active") => {
    const res = await fetch(`${baseUrl}/api/jobs?companyId=${companyId}&status=${status}`);
    return res.json();
}

export const getAllJobs = async () => {
    const res = await fetch(`${baseUrl}/api/jobs`);
    return res.json();
}

export const getJobById = async (jobId) => {
    const res = await fetch(`${baseUrl}/api/jobs/${jobId}`);
    return res.json();
}