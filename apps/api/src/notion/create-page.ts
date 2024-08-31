import { Client } from '@notionhq/client';

export const createPage = async (notion: Client, database_id: string) => {
  const response = await notion.pages.create({
    parent: {
      type: 'database_id',
      database_id,
    },
    properties: {
      title: {
        title: [
          {
            text: {
              content: 'Hello, World!',
            },
          },
        ],
      },
      Color: {
        select: {
          name: 'Red',
        },
      },
    },
    children: [
      {
        object: 'block',
        callout: {
          rich_text: [
            {
              text: {
                content: 'Original Text on red background',
              },
            },
          ],
          color: 'red_background',
        },
      },
      {
        object: 'block',
        callout: {
          rich_text: [
            {
              text: {
                content: 'Original Text on red',
              },
            },
          ],
          color: 'red',
        },
      },
      {
        object: 'block',
        paragraph: {
          rich_text: [
            {
              text: {
                content: 'Any comment',
              },
            },
          ],
        },
      },
    ],
  });
};
