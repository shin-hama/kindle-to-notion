import {
  AmazonAccount,
  type BookInput,
  HighlightColorsSchema,
  type HighlightInput,
} from "@/types";
import { br2ln } from "@/utils/br2ln";

type NextPageState = {
  token: string;
  contentLimitState: string;
};

export const mapTextToColor = (
  highlightClasses: string,
): HighlightInput["color"] => {
  const matches = /kp-notebook-highlight-(.*)/.exec(highlightClasses);
  return matches
    ? HighlightColorsSchema.parse(matches[1].toLowerCase(), {})
    : "yellow";
};

const highlightsUrl = (
  region: AmazonAccount,
  book: BookInput,
  state?: NextPageState | null,
): string => {
  return `${region.notebookUrl}?asin=${book.asin}&contentLimitState=${
    state?.contentLimitState ?? ""
  }&token=${state?.token ?? ""}`;
};

const parseNextPageState = (doc: Document): NextPageState | null => {
  const contentLimitState = doc
    .querySelector(".kp-notebook-content-limit-state")
    ?.getAttribute("value");
  const token = doc.querySelector(".kp-notebook-annotations-next-page-start")
    ?.getAttribute("value");

  return !token || !contentLimitState
    ? null
    : ({ contentLimitState, token } satisfies NextPageState);
};

const parseHighlights = (doc: Document): HighlightInput[] => {
  const highlightsEl = Array.from(
    doc.querySelectorAll(".a-row.a-spacing-base"),
  );

  return highlightsEl
    .map((highlightEl): HighlightInput | null => {
      const pageMatch = /\d+$/.exec(
        highlightEl.querySelector("#annotationNoteHeader")?.textContent ?? "",
      );

      const highlightClasses = highlightEl
        .querySelector(".kp-notebook-highlight")
        ?.getAttribute("class");
      const color = !!highlightClasses
        ? mapTextToColor(highlightClasses)
        : "yellow";

      const text = highlightEl.querySelector("#highlight")?.textContent?.trim();
      if (!text) {
        return null;
      }

      const noteHtml = highlightEl.querySelector("#note")?.innerHTML;
      const location = highlightEl.querySelector("#kp-annotation-location")
        ?.getAttribute("value");

      return {
        id: highlightEl.getAttribute("id") ?? "",
        text,
        color,
        location: parseInt(location ?? "0"),
        page: pageMatch ? parseInt(pageMatch[0]) : null,
        note: !!noteHtml ? br2ln(noteHtml) : null,
      } satisfies HighlightInput;
    })
    .filter((highlight): highlight is HighlightInput => highlight !== null);
};

const loadAndScrapeHighlights = async (
  region: AmazonAccount,
  book: BookInput,
  url: string,
): Promise<HighlightInput[]> => {
  // Load the highlights page and parse it
  const text = await (await fetch(url)).text();
  const htmlDocument = new DOMParser().parseFromString(text, "text/html");

  const nextPageState = parseNextPageState(htmlDocument);

  if (!nextPageState) {
    return parseHighlights(htmlDocument);
  } else {
    const highlights = parseHighlights(htmlDocument);

    return highlights.concat(
      await loadAndScrapeHighlights(
        region,
        book,
        highlightsUrl(region, book, nextPageState),
      ),
    );
  }
};

const scrapeBookHighlights = async (
  region: AmazonAccount,
  book: BookInput,
): Promise<HighlightInput[]> => {
  const url = highlightsUrl(region, book);
  return loadAndScrapeHighlights(region, book, url);
};

export default scrapeBookHighlights;
