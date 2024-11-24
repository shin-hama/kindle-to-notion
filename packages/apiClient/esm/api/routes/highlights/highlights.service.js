export class HighlightsService {
    constructor(supabase) {
        Object.defineProperty(this, "supabase", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: supabase
        });
    }
    async getHighlights() { }
    async createHighlights(newHighlights, user) {
        const { data, error } = await this.supabase
            .from("Highlight")
            .upsert(newHighlights.map((h) => ({ ...h, userId: user.id })))
            .select("*, Book(*)");
        if (error) {
            throw new Error("Error creating highlight");
        }
        return data;
    }
}
