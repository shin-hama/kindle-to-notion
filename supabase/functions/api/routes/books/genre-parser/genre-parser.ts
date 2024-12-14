import Anthropic from "npm:@anthropic-ai/sdk";
import z from "npm:zod";

const SetGenresToolInputSchema = z.object({
  genres: z.array(z.string()),
});

export const parse = async (title: string): Promise<string[]> => {
  const anthropic = new Anthropic({
    apiKey: Deno.env.get("ANTHROPIC_API_KEY"),
  });

  // Replace placeholders like {{BOOK_TITLE}} with real values,
  // because the SDK does not support variables.
  const msg = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 1000,
    temperature: 0,
    tools: [
      {
        "name": "set_genre",
        "description": "Set book genres based on title",
        "input_schema": {
          "type": "object",
          "properties": {
            "genres": {
              "type": "array",
              "description":
                "The most likely genres of the book based on the title",
            },
          },
          "required": [
            "genre",
          ],
        },
      },
    ],
    system:
      'You are tasked with identifying the most likely genre of a book based solely on its title. Follow these instructions carefully:\n\nYou will be given a book title:\n<book_title>BOOK_TITLE</book_title>\n\nConsider the following common book genres:\n- Fiction: Romance, Mystery, Thriller, Science Fiction, Fantasy, Historical Fiction, Literary Fiction\n- Non-fiction: Biography, Autobiography, Self-help, History, Science, Travel, Business, Philosophy\n\nTo determine the most likely genre:\n1. Analyze the words and phrases in the title.\n2. Look for key indicators such as:\n   - Specific words (e.g., "murder" for Mystery, "love" for Romance)\n   - Name of a historical figure (likely Biography)\n   - Fantastical elements (possibly Fantasy or Science Fiction)\n   - Self-improvement phrases (could be Self-help)\n3. Consider the overall tone and style of the title.\n\nIf you\'re unsure between multiple genres, explain your reasoning for each possibility.\n\nNot provide your analysis and conclusion but only say "Done".\n\nRemember, this is an educated guess based solely on the title. The actual genre may differ, but your task is to provide the most logical conclusion based on the given information.',
    messages: [
      {
        "role": "user",
        "content": [
          {
            "type": "text",
            "text": `<book_title>${title}</book_title>`,
          },
        ],
      },
    ],
  });

  const { content } = msg;

  const result = SetGenresToolInputSchema.safeParse(
    content.find((c) => c.type === "tool_use")?.input,
  );

  return result.data?.genres ?? [];
};
