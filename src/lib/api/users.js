import { headers } from "next/headers";
import { protectedFetch} from "../core/server";
import { auth } from "../auth";

export const getUserById = async (userId) => {
  return protectedFetch(`users/${userId}`);
};

export const getUsersList = async () => {
  const users = await auth.api.listUsers({
    query: {
      sortBy: "createdAt",
      sortDirection: "desc",
    },
    // This endpoint requires session cookies.
    headers: await headers(),
  });
  return users;
};
