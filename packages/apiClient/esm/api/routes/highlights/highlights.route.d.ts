import { Database } from "../../../types/database.types.js";
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
                    color: Database["public"]["Enums"]["HighlightColor"];
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
}, "/">;
export { app as highlights };
//# sourceMappingURL=highlights.route.d.ts.map