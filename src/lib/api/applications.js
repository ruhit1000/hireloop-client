import { protectedFetch } from "../core/server";

export const getApplicationsByApplicantId = async (applicantId) => {
  return protectedFetch(`my-applications?applicantId=${applicantId}`);
};

export const getApplicationsByRecruiterId = async (recruiterId) => {
  return protectedFetch(`applications?recruiterId=${recruiterId}`);
};
