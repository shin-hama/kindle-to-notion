declare const app: import("hono/hono-base").HonoBase<import("hono/types").BlankEnv, {
    "/": {
        $post: {
            input: {
                json: {
                    bookId: string;
                    asin: string;
                    highlights: {
                        id: string;
                        color: "blue" | "orange" | "pink" | "yellow";
                        location: number;
                        note: string | null;
                        page: number | null;
                        text: string;
                    }[];
                };
            };
            output: {};
            outputFormat: string;
            status: import("hono/utils/http-status").StatusCode;
        } | {
            input: {
                json: {
                    bookId: string;
                    asin: string;
                    highlights: {
                        id: string;
                        color: "blue" | "orange" | "pink" | "yellow";
                        location: number;
                        note: string | null;
                        page: number | null;
                        text: string;
                    }[];
                };
            };
            output: {};
            outputFormat: string;
            status: import("hono/utils/http-status").StatusCode;
        };
    };
}, "/">;
export { app as highlights };
//# sourceMappingURL=highlights.route.d.ts.map