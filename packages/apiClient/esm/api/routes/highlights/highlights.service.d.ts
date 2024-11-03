import { AuthenticatedUser, Env } from "../../../types/index.js";
import { CreateHighlightModel } from "./highlights.model.js";
export declare class HighlightsService {
    private supabase;
    constructor(env: Env);
    getHighlights(): Promise<void>;
    createHighlights(newHighlights: Array<CreateHighlightModel>, user: AuthenticatedUser): Promise<any>;
}
//# sourceMappingURL=highlights.service.d.ts.map