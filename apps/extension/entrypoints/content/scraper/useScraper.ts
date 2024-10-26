import { CreateBookMessage } from "@/entrypoints/types/messaging";
import scrapeBookHighlights from "./parseBookHighlight";
import scrapeBooks from "./parseBooks";
import { useAtom } from "jotai";
import { scrapingProgress } from "@/states";
import { useCurrentRegion } from "@/hooks/use-i18n";

export const useScraper = () => {
  const [, setState] = useAtom(scrapingProgress);
  const lastUpdated = useLastUpdated();
  const region = useCurrentRegion();

  useEffect(() => {
    scrapeBooks(region)
      .then(async (allBooks) => {
        const lastUpdatedAt = await lastUpdated.get();
        const updatedBooks = allBooks.filter((book) => {
          return new Date(book.lastAnnotatedAt) > new Date(lastUpdatedAt);
        });

        if (updatedBooks.length === 0) {
          setState({
            data: {
              total: 0,
              current: 0,
              title: "No new books",
              completed: true,
              message: "No new highlights to export since last run",
            },
          });
          return;
        }

        for (const [i, book] of updatedBooks.entries()) {
          setState({
            data: {
              total: updatedBooks.length,
              current: i + 1,
              title: book.title,
            },
          });

          const highlights = await scrapeBookHighlights(region, book);
          const result = await browser.runtime.sendMessage(
            {
              type: "CreateBookWithHighlights",
              data: {
                book: book,
                highlights,
              },
            } satisfies CreateBookMessage,
          );

          if (result.error) {
            throw new Error(result.error);
          }
        }
        lastUpdated.set(new Date());

        setState({
          data: {
            total: updatedBooks.length,
            current: updatedBooks.length,
            title: "Completed",
            completed: true,
            message: `Completed exporting ${updatedBooks.length} books`,
          },
        });
      })
      .catch((e) => {
        if (e instanceof Error) {
          console.error(e);
          setState({ error: e.message });
        }
      });
  }, []);
};
