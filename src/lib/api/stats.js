import { protectedFetch } from "../core/server";

export const getRecruiterStats = async (recruiterId) => {
    return protectedFetch(`recruiter-stats?recruiterId=${recruiterId}`);
};