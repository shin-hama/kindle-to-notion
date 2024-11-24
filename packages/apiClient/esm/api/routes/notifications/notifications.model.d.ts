import { z } from "zod";
import { BaseTokenPayload } from "../../../types/index.js";
export declare const ProvidersEnum: z.ZodEnum<["email", "slack"]>;
export type Providers = z.infer<typeof ProvidersEnum>;
export declare const SlackSettingsSchema: z.ZodObject<{
    channelId: z.ZodString;
    channelName: z.ZodString;
}, "strip", z.ZodTypeAny, {
    channelId: string;
    channelName: string;
}, {
    channelId: string;
    channelName: string;
}>;
export type SlackSettings = z.infer<typeof SlackSettingsSchema>;
export declare const EmailSettingsSchema: z.ZodObject<{
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
}, {
    email: string;
}>;
export type EmailSettings = z.infer<typeof EmailSettingsSchema>;
export declare const NotificationSettingsSchema: z.ZodUnion<[z.ZodObject<{
    platform: z.ZodLiteral<"email">;
    settings: z.ZodObject<{
        email: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        email: string;
    }, {
        email: string;
    }>;
}, "strip", z.ZodTypeAny, {
    settings: {
        email: string;
    };
    platform: "email";
}, {
    settings: {
        email: string;
    };
    platform: "email";
}>, z.ZodObject<{
    platform: z.ZodLiteral<"slack">;
    settings: z.ZodObject<{
        channelId: z.ZodString;
        channelName: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        channelId: string;
        channelName: string;
    }, {
        channelId: string;
        channelName: string;
    }>;
}, "strip", z.ZodTypeAny, {
    settings: {
        channelId: string;
        channelName: string;
    };
    platform: "slack";
}, {
    settings: {
        channelId: string;
        channelName: string;
    };
    platform: "slack";
}>]>;
export type NotificationSettings = z.infer<typeof NotificationSettingsSchema>;
export type NotificationTokenPayload = BaseTokenPayload & NotificationSettings;
//# sourceMappingURL=notifications.model.d.ts.map