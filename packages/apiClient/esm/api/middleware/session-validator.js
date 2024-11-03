import { createMiddleware } from "hono/factory";
import { getCookie } from "hono/cookie";
import { env } from "hono/adapter";
import { UsersService } from "../services/users.js";
import { EnvSchema } from "../../types/index.js";
export const sessionValidator = createMiddleware(async (c, next) => {
    const session = getCookie(c, "session_token");
    if (!session) {
        c.status(401);
        return c.text("Unauthorized");
    }
    const parsedEnv = EnvSchema.safeParse(env(c));
    if (!parsedEnv.success) {
        c.status(500);
        console.error(parsedEnv.error);
        return c.text("Internal server error");
    }
    try {
        const usersService = new UsersService(parsedEnv.data.SUPABASE_URL, parsedEnv.data.SUPABASE_SERVICE_ROLE_KEY, parsedEnv.data.ENCRYPTION_KEY);
        const user = await usersService.verifyAdmin(session);
        if (!user) {
            c.status(401);
            return c.text("Unauthorized");
        }
        c.set("user", user);
        await next();
    }
    catch (error) {
        c.status(500);
        console.error(error);
        return c.text("Internal server error");
    }
});
