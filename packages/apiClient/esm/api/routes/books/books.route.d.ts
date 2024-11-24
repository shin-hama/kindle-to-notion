declare const app: import("hono/hono-base").HonoBase<import("hono/types").BlankEnv, {
    "/": {
        $post: {
            input: {
                json: {
                    asin: string;
                    author: string;
                    imageUrl: string | null;
                    title: string;
                    url: string | null;
                    lastAnnotatedAt: string;
                };
            };
            output: {
                message: string;
                book: {
                    asin: string;
                    author: string;
                    created_at: string;
                    id: string;
                    imageUrl: string | null;
                    title: string;
                    url: string | null;
                };
            };
            outputFormat: "json";
            status: 201;
        } | {
            input: {
                json: {
                    asin: string;
                    author: string;
                    imageUrl: string | null;
                    title: string;
                    url: string | null;
                    lastAnnotatedAt: string;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 500;
        };
    };
}, "/">;
export { app as books };
//# sourceMappingURL=books.route.d.ts.map