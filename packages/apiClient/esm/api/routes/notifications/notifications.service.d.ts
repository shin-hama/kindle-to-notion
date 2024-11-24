import { AuthenticatedUser, Env } from "../../../types/index.js";
import { NotificationSettings } from "./notifications.model.js";
export declare class NotificationsService {
    private supabase;
    constructor(env: Env);
    saveSettings(settings: NotificationSettings, user: AuthenticatedUser): Promise<{
        created_at: string;
        id: string;
        is_active: boolean;
        settings: import("../../../types/database.types.js").Json;
        updated_at: string;
        user_id: string;
    }[]>;
}
//# sourceMappingURL=notifications.service.d.ts.map