import { protectedFetch } from "../core/server";

export const getSavedJobIds = async () => {
  return protectedFetch("saved-jobs/ids");
}

export const mySavedJobs = async () => {
  return protectedFetch("saved-jobs");
}