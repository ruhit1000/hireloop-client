import { serverFetch } from "../core/server";

export const getApplicationsByApplicantId = async (applicantId) => {
    return serverFetch(`applications/applicant/${applicantId}`);
}