"use server";

import { serverMutation } from "../core/server";

export const toggleSavedJob = async (jobId) => {
  return serverMutation("saved-jobs/toggle", "POST", { jobId });
};