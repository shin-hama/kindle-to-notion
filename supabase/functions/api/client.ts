import { api } from "./app.ts";
import { hc } from "npm:hono/client";

// assign the client to a variable to calculate the type when compiling
const client = hc<typeof api>("");
export type Client = typeof client;

export const hcWithType = (...args: Parameters<typeof hc>): Client =>
  hc<typeof api>(...args);
