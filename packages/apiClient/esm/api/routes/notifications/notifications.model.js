import { z } from "zod";
export const ProvidersEnum = z.enum(["email", "slack"]);
export const SlackSettingsSchema = z.object({
    channelId: z.string(),
    channelName: z.string(),
});
export const EmailSettingsSchema = z.object({
    email: z.string().email(),
});
export const NotificationSettingsSchema = z.union([
    z.object({
        platform: z.literal(ProvidersEnum.Values.email),
        settings: EmailSettingsSchema,
    }),
    z.object({
        platform: z.literal(ProvidersEnum.Values.slack),
        settings: SlackSettingsSchema,
    }),
]);
