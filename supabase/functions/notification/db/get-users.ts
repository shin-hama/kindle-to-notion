import { createClient } from "./client.ts";

export const getAllUsers = async () => {
  const client = createClient();

  return (await client.from("NotionUser").select(
    "*, NotionSecret(access_token), NotionPage(page_id)",
  )).data;
};
