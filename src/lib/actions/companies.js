"use server";

import { serverDelete, serverMutation } from "../core/server";

export const createCompany = async (newCompanyData) => {
  return serverMutation("companies", "POST", newCompanyData);
};

export const updateCompany = async (id, companyData) => {
  return serverMutation(`companies/${id}`, "PATCH", companyData);
};

export const deleteCompany = async (id) => {
  return serverDelete(`companies/${id}`);
};
