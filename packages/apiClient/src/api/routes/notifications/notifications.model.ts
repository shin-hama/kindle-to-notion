import { z } from "zod";
import { BaseTokenPayload } from "../../../types/index.js";

export const ProvidersEnum = z.enum(["email", "slack"] as const);
export type Providers = z.infer<typeof ProvidersEnum>;

export const SlackSettingsSchema = z.object({
  channelId: z.string(),
  channelName: z.string(),
});
export type SlackSettings = z.infer<typeof SlackSettingsSchema>;

export const EmailSettingsSchema = z.object({
  email: z.string().email(),
});
export type EmailSettings = z.infer<typeof EmailSettingsSchema>;

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
export type NotificationSettings = z.infer<typeof NotificationSettingsSchema>;

export type NotificationTokenPayload =
  & BaseTokenPayload
  & NotificationSettings;
