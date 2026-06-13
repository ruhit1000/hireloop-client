import { protectedFetch, serverFetch } from "../core/server";

export const getCompanyJobs = async (companyId, status = "active") => {
  return serverFetch(`jobs?companyId=${companyId}&status=${status}`);
};

export const getAllActiveJobs = async (searchParams = {}) => {
  const query = new URLSearchParams({ status: "active" });

  if (searchParams.query) query.append("search", searchParams.query);
  if (searchParams.type) query.append("type", searchParams.type);
  if (searchParams.category) query.append("category", searchParams.category);
  if (searchParams.location) query.append("location", searchParams.location);

  // NEW: Capture pagination parameters from the URL
  if (searchParams.page) query.append("page", searchParams.page);
  if (searchParams.perPage) query.append("perPage", searchParams.perPage);

  const queryString = query.toString() ? `?${query.toString()}` : "";

  return serverFetch(`jobs${queryString}`);
};

export const getJobById = async (jobId) => {
  return protectedFetch(`jobs/${jobId}`);
};

export const getFeaturedJobs = async () => {
  return serverFetch(`jobs?featured=true`);
};
