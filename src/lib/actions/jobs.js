"use server";

import { serverMutation } from "../core/server";

export const createJob = async (newJobData) => {
  return serverMutation("/api/jobs", newJobData);
};

// const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

// export const createJob = async (newJobData) => {
//   const res = await fetch(`${baseURL}/api/jobs`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(newJobData),
//   });

//   return res.json();
// };
