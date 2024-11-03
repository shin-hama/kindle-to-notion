import { AuthenticatedUser, Env } from "../../../types/index.js";
import { NotificationSettings } from "./notifications.model.js";
export declare class NotificationsService {
    private supabase;
    constructor(env: Env);
    saveSettings(settings: NotificationSettings, user: AuthenticatedUser): Promise<any>;
}
//# sourceMappingURL=notifications.service.d.ts.map