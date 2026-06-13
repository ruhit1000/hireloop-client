import { protectedFetch } from "../core/server";

export const getCompanyByUserId = async (userId) => {
    return protectedFetch(`companies/${userId}`);
}

export const getCompanies = async (page = 1, limit = 5, status = "all") => {
    return protectedFetch(`companies?page=${page}&limit=${limit}&status=${status}`);
};