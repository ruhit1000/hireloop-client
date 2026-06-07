"use server";

import { getCompanyJobs } from "../api/jobs";
import { serverDelete, serverMutation } from "../core/server";
import { deleteJob } from "./jobs";

export const createCompany = async (newCompanyData) => {
  return serverMutation("companies", "POST", newCompanyData);
};

export const updateCompany = async (id, companyData) => {
  return serverMutation(`companies/${id}`, "PATCH", companyData);
};

export const deleteCompany = async (id) => {
  const allJobsRes = await getCompanyJobs(id);
  await allJobsRes.forEach(async (job) => deleteJob(job._id));
  return serverDelete(`companies/${id}`);
};
