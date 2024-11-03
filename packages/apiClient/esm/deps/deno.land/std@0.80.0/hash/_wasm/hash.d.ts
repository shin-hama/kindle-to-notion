import type { Hasher, Message, OutputFormat } from "../hasher.js";
export declare class Hash implements Hasher {
    #private;
    constructor(algorithm: string);
    /**
     * Update internal state
     * @param data data to update
     */
    update(data: Message): this;
    /** Returns final hash */
    digest(): ArrayBuffer;
    /**
     * Returns hash as a string of given format
     * @param format format of output string (hex or base64). Default is hex
     */
    toString(format?: OutputFormat): string;
}
//# sourceMappingURL=hash.d.ts.map