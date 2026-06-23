"use server";

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";

export const createCompany = async (newCompanyData) => {
  return serverMutation("/api/companies", newCompanyData);
};

export const updateCompany = async (id, data) => {
  // Call your API
  const result = await serverMutation(`/api/companies/${id}`, data, "PATCH");

  // 💡 CRITICAL: Tell Next.js to clear the cache for the admin companies page
  // so the table updates immediately without a full page refresh!
  revalidatePath("/dashboard/admin/companies");

  return result;
};

// const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

// export const createCompany = async (newCompanyData) => {
//   const res = await fetch(`${baseURL}/api/companies`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(newCompanyData),
//   });

//   return res.json();
// };
