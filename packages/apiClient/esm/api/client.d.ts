declare const client: {
    health: import("hono/client").ClientRequest<{
        $get: {
            input: {};
            output: "Hello Hono!";
            outputFormat: "text";
            status: import("hono/utils/http-status").StatusCode;
        };
    }>;
} & {
    kindle: {
        open: import("hono/client").ClientRequest<{
            $get: {
                input: {};
                output: undefined;
                outputFormat: "redirect";
                status: 302;
            };
        }>;
    };
} & {
    books: import("hono/client").ClientRequest<{
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
    }>;
} & {
    health: import("hono/client").ClientRequest<{
        $get: {
            input: {};
            output: "Hello Hono!";
            outputFormat: "text";
            status: import("hono/utils/http-status").StatusCode;
        };
    }>;
} & {
    kindle: {
        open: import("hono/client").ClientRequest<{
            $get: {
                input: {};
                output: undefined;
                outputFormat: "redirect";
                status: 302;
            };
        }>;
    };
} & {
    highlights: import("hono/client").ClientRequest<{
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
    }>;
} & {
    health: import("hono/client").ClientRequest<{
        $get: {
            input: {};
            output: "Hello Hono!";
            outputFormat: "text";
            status: import("hono/utils/http-status").StatusCode;
        };
    }>;
} & {
    kindle: {
        open: import("hono/client").ClientRequest<{
            $get: {
                input: {};
                output: undefined;
                outputFormat: "redirect";
                status: 302;
            };
        }>;
    };
} & {
    users: {
        me: import("hono/client").ClientRequest<{
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
        }>;
    };
} & {
    health: import("hono/client").ClientRequest<{
        $get: {
            input: {};
            output: "Hello Hono!";
            outputFormat: "text";
            status: import("hono/utils/http-status").StatusCode;
        };
    }>;
} & {
    kindle: {
        open: import("hono/client").ClientRequest<{
            $get: {
                input: {};
                output: undefined;
                outputFormat: "redirect";
                status: 302;
            };
        }>;
    };
} & {
    notifications: {
        slack: import("hono/client").ClientRequest<{
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
        }>;
    };
} & {
    health: import("hono/client").ClientRequest<{
        $get: {
            input: {};
            output: "Hello Hono!";
            outputFormat: "text";
            status: import("hono/utils/http-status").StatusCode;
        };
    }>;
} & {
    kindle: {
        open: import("hono/client").ClientRequest<{
            $get: {
                input: {};
                output: undefined;
                outputFormat: "redirect";
                status: 302;
            };
        }>;
    };
};
export type Client = typeof client;
export declare const hcWithType: (baseUrl: string, options?: import("hono/client").ClientRequestOptions | undefined) => Client;
export {};
//# sourceMappingURL=client.d.ts.map