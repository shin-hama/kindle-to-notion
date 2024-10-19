export const contentScriptMatches = import.meta.env.DEV
  ? ["*://read.amazon.co.jp/notebook*", "http://localhost/*"]
  : ["*://read.amazon.co.jp/notebook*"];

export const cookiesPermissions = import.meta.env.DEV
  ? ["*://localhost:54321/*"]
  : ["*://weeyyhchehgnmmhblgxy.supabase.co/*"];
