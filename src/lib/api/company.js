import { serverFetch } from "../core/server";

export const getCompanyByUserId = async (userId) => {
    return serverFetch(`companies/${userId}`);
}