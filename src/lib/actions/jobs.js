'use server';

import { serverDelete, serverMutation } from "../core/server";

export const createJob = async (newJobData) => {
    return serverMutation("jobs", "POST", newJobData);
}

export const deleteJob = async (jobId) => {
    return serverDelete(`jobs/${jobId}`);
}