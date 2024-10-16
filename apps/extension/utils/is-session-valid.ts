import { SESSION_TOKEN_KEY } from "@kino/shared";

/**
 * 現在のセッションが有効か確認するために API サーバーのクッキーを確認します。
 * @returns
 */
export const isSessionValid = async (): Promise<boolean> => {
  try {
    const cookie = await browser.cookies.get({
      url: "http://localhost:54321",
      // url: import.meta.env.VITE_API_SERVER_URL ?? "",
      name: SESSION_TOKEN_KEY,
    });
    return cookie !== null;
  } catch (e) {
    console.error("Failed to get cookie", e);
    return false;
  }
};
