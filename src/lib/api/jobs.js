const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getCompanyJobs = async (companyId) => {
    const res = await fetch(`${baseUrl}/api/jobs/${companyId}`);
    return res.json();
}

