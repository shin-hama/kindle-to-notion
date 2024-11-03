import { hc } from "hono/client";
declare const client: any;
export type Client = typeof client;
export declare const hcWithType: (...args: Parameters<typeof hc>) => Client;
export {};
//# sourceMappingURL=client.d.ts.map