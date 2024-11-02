import { createClient } from "./client.ts";

export const getAllUsers = async () => {
  const client = createClient();

  return (await client.from("NotionUser").select("*")).data;
};
