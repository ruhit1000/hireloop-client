import { serverFetch } from "../core/server";

export const getRecruiterStats = async (recruiterId) => {
    return serverFetch(`recruiter-stats?recruiterId=${recruiterId}`);
};