import { serverFetch } from "../core/server";

export const getCompanyJobs = async (companyId, status = "active") => {
  return serverFetch(`jobs?companyId=${companyId}&status=${status}`);
};

export const getAllJobs = async (searchParams = {}) => {
  const query = new URLSearchParams();

  if (searchParams.query) query.append("search", searchParams.query);
  if (searchParams.type) query.append("type", searchParams.type);
  if (searchParams.category) query.append("category", searchParams.category);
  if (searchParams.location) query.append("location", searchParams.location);

  const queryString = query.toString() ? `?${query.toString()}` : "";

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs${queryString}`,
    {
      cache: "no-store",
    },
  );

  return res.json();
};

export const getJobById = async (jobId) => {
  return serverFetch(`jobs/${jobId}`);
};

export const getFeaturedJobs = async () => {
  return serverFetch(`jobs?featured=true`);
};
