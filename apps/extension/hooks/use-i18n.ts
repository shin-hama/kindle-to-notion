import { AmazonRegions } from "@/entrypoints/content/scraper/amazon/region";

export const useCurrentRegion = () => {
  const getCurrentRegion = useCallback(() => {
    const lang = browser.i18n.getUILanguage();

    if (lang.startsWith("ja")) {
      return AmazonRegions.japan;
    } else if (lang.startsWith("fr")) {
      return AmazonRegions.france;
    } else if (lang.startsWith("de")) {
      return AmazonRegions.germany;
    } else if (lang.startsWith("it")) {
      return AmazonRegions.italy;
    } else if (lang.startsWith("es")) {
      return AmazonRegions.spain;
    } else if (lang.startsWith("en-GB")) {
      return AmazonRegions.UK;
    } else if (lang.startsWith("en-IN")) {
      return AmazonRegions.india;
    } else {
      return AmazonRegions.global;
    }
  }, []);

  return useMemo(() => {
    const region = getCurrentRegion();

    return region;
  }, [getCurrentRegion]);
};
