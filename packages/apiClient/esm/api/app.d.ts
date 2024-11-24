declare const app: import("hono/hono-base").HonoBase<import("hono/types").BlankEnv, ((import("hono/types").BlankSchema | import("hono/types").MergeSchemaPath<{
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
}, "/books"> | import("hono/types").MergeSchemaPath<{
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
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 500;
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
            output: {
                message: string;
                highlight: {
                    bookId: string;
                    color: import("../types/database.types.js").Database["public"]["Enums"]["HighlightColor"];
                    created_at: string;
                    id: string;
                    location: number;
                    note: string | null;
                    notionPageId: string | null;
                    page: number | null;
                    text: string;
                    userId: string;
                    Book: {
                        asin: string;
                        author: string;
                        created_at: string;
                        id: string;
                        imageUrl: string | null;
                        title: string;
                        url: string | null;
                    } | null;
                }[];
            };
            outputFormat: "json";
            status: 201;
        };
    };
}, "/highlights"> | import("hono/types").MergeSchemaPath<{
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
}, "/users"> | import("hono/types").MergeSchemaPath<{
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
}, "/notifications">) & {
    "/health": {
        $get: {
            input: {};
            output: "Hello Hono!";
            outputFormat: "text";
            status: import("hono/utils/http-status").StatusCode;
        };
    };
}) & {
    "/kindle/open": {
        $get: {
            input: {};
            output: undefined;
            outputFormat: "redirect";
            status: 302;
        };
    };
}, "/">;
export { app as api };
//# sourceMappingURL=app.d.ts.map