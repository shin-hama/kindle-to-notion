import { createClient } from "./client.ts";

export const getNotificationSettings = async (userId: string) => {
  const client = createClient();

  return (await client.from("Notifications").select(
    "*",
  ).eq("user_id", userId).single()).data;
};
