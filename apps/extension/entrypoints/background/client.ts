import { hcWithType } from "@kino/api-client";

export const createClient = () => {
  return hcWithType(`${import.meta.env.VITE_API_SERVER_URL}/`, {
    fetch: (req: RequestInfo | URL, init?: RequestInit) =>
      fetch(req, {
        ...init,
        credentials: "include",
      }),
  });
};
