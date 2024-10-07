export const contentScriptMatches = import.meta.env.DEV
  ? ["*://read.amazon.co.jp/notebook*", "http://localhost/*"]
  : ["*://read.amazon.co.jp/notebook*"];
