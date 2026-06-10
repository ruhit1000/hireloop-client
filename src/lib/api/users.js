import { serverFetch } from "../core/server"

export const getUserById = async (userId) => {
    return serverFetch(`users/${userId}`)
}