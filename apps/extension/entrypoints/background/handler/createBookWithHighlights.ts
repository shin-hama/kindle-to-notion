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

    await client.highlights.$post({
      json: {
        bookId: createdBook.id,
        asin: book.asin,
        highlights: highlights,
      },
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
