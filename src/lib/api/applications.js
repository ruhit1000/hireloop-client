import { serverFetch } from "../core/server";

export const getApplicationsByApplicantId = async (applicantId) => {
    return serverFetch(`applications?applicantId=${applicantId}`);
}

export const getApplicationsByRecruiterId = async (recruiterId) => {
    return serverFetch(`applications?recruiterId=${recruiterId}`);
}