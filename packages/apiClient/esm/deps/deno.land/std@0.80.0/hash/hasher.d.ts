export type Message = string | ArrayBuffer;
export type OutputFormat = "hex" | "base64";
export interface Hasher {
    update(data: Message): this;
    digest(): ArrayBuffer;
    toString(format?: OutputFormat): string;
}
//# sourceMappingURL=hasher.d.ts.map