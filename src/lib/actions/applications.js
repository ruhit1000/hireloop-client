'use server';

import { serverMutation } from "../core/server";

export const submitApplication = async (applicationData) => {
    return serverMutation("applications", "POST", applicationData);
}

export const updateApplicationStatus = async (applicationId, newStatus) => {
    return serverMutation(`applications/${applicationId}`, "PATCH", { status: newStatus });
}