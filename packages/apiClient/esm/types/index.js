import { z } from "zod";
export const EnvSchema = z.object({
    ENCRYPTION_KEY: z.string(),
    SUPABASE_URL: z.string(),
    SUPABASE_SERVICE_ROLE_KEY: z.string(),
    NOTION_REDIRECT_URL: z.string(),
    NOTION_CLIENT_ID: z.string(),
    NOTION_CLIENT_SECRET: z.string(),
    API_URL: z.string(),
    SLACK_BOT_TOKEN: z.string(),
    TOKEN_SECRET: z.string(),
});
