import { Hono } from "npm:hono";
import { sessionValidator } from "../../middleware/session-validator.ts";
import { Client, isFullPage } from "npm:@notionhq/client";

type User = {
  id: string;
  name: string;
  avatarUrl: string;
  pageUrl: string | null;
};

const app = new Hono().get("me", sessionValidator, async (c) => {
  console.log("test");
  const { NotionSecret, ...user } = c.var.user;

  try {
    const notion = new Client({
      auth: NotionSecret.access_token,
    });
    const page = await notion.pages.retrieve({
      page_id: user.NotionPage.page_id,
    });

    return c.json(
      {
        id: user.id,
        name: user.name,
        avatarUrl: user.avatar_url,
        pageUrl: isFullPage(page) ? page.url : null,
      },
    );
  } catch (error) {
    c.status(500);
    console.error(error);
    return c.text("Internal server error");
  }
});

export { app as users };
