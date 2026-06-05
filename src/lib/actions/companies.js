"use server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const createCompany = async (newCompanyData) => {
  const res = await fetch(`${baseUrl}/api/companies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCompanyData),
  });
  return res.json();
};

export const updateCompany = async (userId, companyData) => {
  const res = await fetch(`${baseUrl}/api/companies/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(companyData),
  });
  return res.json();
};

export const deleteCompany = async (userId) => {
  const res = await fetch(`${baseUrl}/api/companies/${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
};
