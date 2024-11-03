import { createClient } from "../../../deps/jsr.io/@supabase/supabase-js/2.45.4/src/index.js";
export class NotificationsService {
    constructor(env) {
        Object.defineProperty(this, "supabase", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
    }
    async saveSettings(settings, user) {
        const { data, error } = await this.supabase
            .from("Notifications")
            .upsert({
            user_id: user.id,
            is_active: true,
            settings: settings,
        })
            .select();
        if (error) {
            throw new Error("Error creating highlight");
        }
        return data;
    }
}
