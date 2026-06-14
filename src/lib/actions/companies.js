"use server";

import { serverMutation } from "../core/server";

export const createCompany = async (newCompanyData) => {
  return serverMutation("/api/companies", newCompanyData);
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
