const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getCompanyJobs = async (companyId, status = "active") => {
    const res = await fetch(`${baseUrl}/api/jobs?companyId=${companyId}&status=${status}`);
    return res.json();
}

export const getAllJobs = async (searchParams = {}) => {
  const query = new URLSearchParams();
  
  if (searchParams.query) query.append("search", searchParams.query);
  if (searchParams.type) query.append("type", searchParams.type);
  if (searchParams.category) query.append("category", searchParams.category);
  if (searchParams.location) query.append("location", searchParams.location);

  const queryString = query.toString() ? `?${query.toString()}` : "";

  const res = await fetch(`${baseUrl}/api/jobs${queryString}`, {
    cache: "no-store"
  });
  
  return res.json();
}

export const getJobById = async (jobId) => {
    const res = await fetch(`${baseUrl}/api/jobs/${jobId}`);
    return res.json();
}

export const getFeaturedJobs = async () => {
    const res = await fetch(`${baseUrl}/api/jobs?featured=true`);
    return res.json();
}