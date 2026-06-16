import { protectedFetch, serverFetch } from "../core/server";

export const getCompanyByUserId = async (userId) => {
  return protectedFetch(`companies/${userId}`);
};

export const getCompanies = async (
  page = 1,
  limit = 5,
  status = "all",
  search = "",
) => {
  const queryParams = `page=${page}&limit=${limit}&status=${status}&search=${encodeURIComponent(search)}`;
  return serverFetch(`companies?${queryParams}`);
};

export const getCompanyById = async (companyId) => {
  return protectedFetch(`companies/${companyId}`);
};
