"use server";

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

export const serverFetch = async (path) => {
  // console.log(path, baseURL, "Server fetch for com");

  const res = await fetch(`${baseURL}${path}`);

  return res.json();
};

export const serverMutation = async (path, data) => {
  const res = await fetch(`${baseURL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  //   handle 401,404,403

  return res.json();
};
