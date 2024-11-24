declare const app: import("hono/hono-base").HonoBase<import("hono/types").BlankEnv, {
    me: {
        $get: {
            input: {};
            output: "Internal server error";
            outputFormat: "text";
            status: import("hono/utils/http-status").StatusCode;
        } | {
            input: {};
            output: {
                id: string;
                name: string | null;
                avatarUrl: string | null;
                pageUrl: string | null;
            };
            outputFormat: "json";
            status: import("hono/utils/http-status").StatusCode;
        };
    };
}, "/">;
export { app as users };
//# sourceMappingURL=users.route.d.ts.map