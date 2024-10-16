import { createClient } from "../client";

export const me = async () => {
  try {
    const client = createClient();
    const result = await client.users.me.$get();

    if (result.status !== 200) {
      console.error("Failed to get user");
      return null;
    }

    const user = await result.json();

    return user;
  } catch (e) {
    console.error("Failed to get user", e);
    return null;
  }
};
