import { CreateBookMessage } from "@/entrypoints/types/messaging";
import { createClient } from "../client";

const handler = async ({ book, highlights }: CreateBookMessage["data"]) => {
  try {
    const client = createClient();

    const result = await client.books.$post({
      json: book,
    });

    if (result.status !== 201) {
      console.error("Failed to create book", result);
      return { error: "failed to create book" };
    }
    const { book: createdBook } = await result.json();

    // split every 10 highlights to avoid rate limit
    const chunkedHighlights = highlights.reduce((acc, highlight, i) => {
      const index = Math.floor(i / 10);
      acc[index] = acc[index] || [];
      acc[index].push(highlight);
      return acc;
    }, [] as typeof highlights[]);

    chunkedHighlights.forEach(async (_highlights) => {
      await client.highlights.$post({
        json: {
          bookId: createdBook.id,
          asin: book.asin,
          highlights: _highlights,
        },
      });

      // wait for a few second every requests to avoid rate limit
      await new Promise((resolve) => setTimeout(resolve, 5000));
    });

    return { book: createdBook };
  } catch (e) {
    console.error("Failed to create book with highlights", e);
    return {
      error: "failed to create book with highlights",
    };
  }
};

export { handler };
