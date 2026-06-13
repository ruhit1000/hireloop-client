import { protectedFetch } from "../core/server";

export const isJobSaved = async (jobId) => {
  return protectedFetch(`saved-jobs/check/${jobId}`);
};
