declare const app: import("hono/hono-base").HonoBase<import("hono/types").BlankEnv, {
    slack: {
        $get: {
            input: {};
            output: "Channel ID and Name is required";
            outputFormat: "text";
            status: 400;
        } | {
            input: {};
            output: "Successfully registered slack notification settings, please close this page";
            outputFormat: "text";
            status: 200;
        };
    };
}, "/">;
export { app as notifications };
//# sourceMappingURL=notifications.route.d.ts.map