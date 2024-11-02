import { Client, isFullPage } from "npm:@notionhq/client";

export const getPageUrl = async (accessToken: string, pageId: string) => {
  const notion = new Client({
    auth: accessToken,
  });
  const page = await notion.pages.retrieve({
    page_id: pageId,
  });

  return isFullPage(page) ? page.url : null;
};
