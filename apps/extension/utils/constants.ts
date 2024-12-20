import { AmazonRegions } from "./region";

export const contentScriptMatches = import.meta.env.DEV
  ? ["*://read.amazon.co.jp/notebook*", "http://localhost/*"]
  : Object.values(AmazonRegions).map((region) =>
    `*://read.${region.hostname}/*`
  );

export const cookiesPermissions = import.meta.env.DEV
  ? ["*://localhost:54321/*"]
  : ["*://weeyyhchehgnmmhblgxy.supabase.co/*"];
