import { useEffect } from "react";

const SITE_NAME = "Fractured Within";
const SITE_URL = "https://fracturedwithin.de";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

type SeoProps = {
  title?: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
};

const upsertMeta = (selector: string, attribute: "name" | "property", key: string, content: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
};

const upsertCanonical = (href: string) => {
  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }

  canonical.href = href;
};

const Seo = ({ title, description, path = "/", image = DEFAULT_IMAGE, noIndex = false }: SeoProps) => {
  useEffect(() => {
    const pageTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Modern Metal from NRW, Germany`;
    const canonicalUrl = `${SITE_URL}${path === "/" ? "/" : path}`;
    const robots = noIndex ? "noindex, nofollow" : "index, follow";

    document.title = pageTitle;

    upsertMeta('meta[name="description"]', "name", "description", description);
    upsertMeta('meta[name="robots"]', "name", "robots", robots);

    upsertMeta('meta[property="og:title"]', "property", "og:title", pageTitle);
    upsertMeta('meta[property="og:description"]', "property", "og:description", description);
    upsertMeta('meta[property="og:type"]', "property", "og:type", "website");
    upsertMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl);
    upsertMeta('meta[property="og:image"]', "property", "og:image", image);
    upsertMeta('meta[property="og:image:alt"]', "property", "og:image:alt", "Fractured Within band photo and logo");

    upsertMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", pageTitle);
    upsertMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    upsertMeta('meta[name="twitter:image"]', "name", "twitter:image", image);

    upsertCanonical(canonicalUrl);
  }, [title, description, path, image, noIndex]);

  return null;
};

export default Seo;
