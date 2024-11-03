import { EnvSchema } from "../../types/index.js";
import { env } from "hono/adapter";
export const parseEnv = (c) => {
    const result = EnvSchema.safeParse(env(c));
    if (!result.success) {
        throw new Error("Environment variables are not valid", result.error);
    }
    return result.data;
};
