'use server';
import { headers } from "next/headers";
import { auth } from "../auth";

export const updateUserRole = async (userId, newRole) => {
  const data = await auth.api.setRole({
    body: {
      userId: userId,
      role: newRole,
    },
    // This endpoint requires session cookies.
    headers: await headers(),
  });
  return data;
};
