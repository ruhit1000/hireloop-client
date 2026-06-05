const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getCompanyByUserId = async (userId) => {
    const res = await fetch(`${baseUrl}/api/companies/${userId}`);
    return res.json();
}