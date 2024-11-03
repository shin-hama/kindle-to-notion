import { Context } from "hono";
import { Env, EnvSchema } from "../../types/index.js";
import { env } from "hono/adapter";

export const parseEnv = (c: Context): Env => {
  const result = EnvSchema.safeParse(env(c));
  if (!result.success) {
    throw new Error("Environment variables are not valid", result.error);
  }

  return result.data;
};
