import { createClient } from "../../../deps/jsr.io/@supabase/supabase-js/2.45.4/src/index.js";
export class HighlightsService {
    constructor(env) {
        Object.defineProperty(this, "supabase", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
    }
    async getHighlights() { }
    async createHighlights(newHighlights, user) {
        const { data, error } = await this.supabase
            .from("Highlight")
            .upsert(newHighlights.map((h) => ({ ...h, userId: user.id })))
            .select();
        if (error) {
            throw new Error("Error creating highlight");
        }
        return data;
    }
}
