import { AuthenticatedUser } from "../../types/index.js";
export declare const sessionValidator: import("hono").MiddlewareHandler<{
    Variables: {
        user: AuthenticatedUser;
    };
}, string, {}>;
//# sourceMappingURL=session-validator.d.ts.map