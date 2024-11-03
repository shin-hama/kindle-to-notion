import { Hono } from "hono";
import { sessionValidator } from "../../middleware/session-validator.js";
import { Client, isFullPage } from "@notionhq/client";
const app = new Hono().get("me", sessionValidator, async (c) => {
    const { NotionSecret, ...user } = c.var.user;
    try {
        const notion = new Client({
            auth: NotionSecret.access_token,
        });
        const page = await notion.pages.retrieve({
            page_id: user.NotionPage.page_id,
        });
        return c.json({
            id: user.id,
            name: user.name,
            avatarUrl: user.avatar_url,
            pageUrl: isFullPage(page) ? page.url : null,
        });
    }
    catch (error) {
        c.status(500);
        console.error(error);
        return c.text("Internal server error");
    }
});
export { app as users };
