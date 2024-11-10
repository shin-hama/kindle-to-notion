import { create, verify } from "https://deno.land/x/djwt@v3.0.2/mod.ts";
import type { Header } from "https://deno.land/x/djwt@v3.0.2/mod.ts";
import type { BaseTokenPayload } from "../types/index.ts";

export class TokenService<T extends BaseTokenPayload> {
  static async create<T extends BaseTokenPayload>(secret: string) {
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign", "verify"],
    );

    return new TokenService<T>(secret, key);
  }

  private constructor(private secret: string, private key: CryptoKey) {}

  /**
   * トークンを生成する
   * @param key 格納するキー
   * @param expiresInMinutes 有効期限（分）
   * @returns 生成されたJWTトークン
   */
  async generateToken(
    payload: T,
    expiresInMinutes: number,
  ): Promise<string> {
    const exp = Math.floor(Date.now() / 1000) + expiresInMinutes * 60;

    const token: T = {
      ...payload,
      exp,
      iat: Math.floor(Date.now() / 1000),
    };

    const header: Header = {
      alg: "HS256",
      typ: "JWT",
    };

    return await create(header, token, this.key);
  }

  /**
   * トークンを検証し、格納されているキーを取得する
   * @param token JWTトークン
   * @returns 検証結果とキー
   */
  async verifyAndDecodeToken(token: string): Promise<{
    isValid: boolean;
    payload?: T;
    error?: string;
  }> {
    try {
      // トークンの署名を検証
      const payload = await verify(token, this.key) as T;

      // 有効期限をチェック
      const now = Math.floor(Date.now() / 1000);
      if (payload.exp && payload.exp < now) {
        return {
          isValid: false,
          error: "Token has expired",
        };
      }

      return {
        isValid: true,
        payload,
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          isValid: false,
          error: error.message,
        };
      } else {
        return {
          isValid: false,
          error: "An error occurred",
        };
      }
    }
  }
}
