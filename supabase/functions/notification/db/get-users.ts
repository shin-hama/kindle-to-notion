import { decrypt } from "../../lib/encrypt.ts";
import { Env } from "../../types/index.ts";
import { createClient } from "./client.ts";

export const getAllUsers = async (env: Env) => {
  const client = createClient();

  const users = (await client.from("NotionUser").select(
    "*, NotionSecret(access_token), NotionPage(page_id)",
  )).data;

  return await Promise.all(
    users?.map(async (user) => ({
      ...user,
      NotionSecret: {
        access_token: await decrypt(
          user.NotionSecret?.access_token ?? "",
          env.ENCRYPTION_KEY,
        ),
      },
    })) ?? [],
  );
};
