import { createClient } from "./client.ts";

export async function getRandomeNote(userId: string) {
  const client = createClient();

  const highlight = await client.from("random_highlights").select("*").eq(
    "userId",
    userId,
  ).limit(1).single();

  console.log(highlight.data);

  return highlight.data;
}
