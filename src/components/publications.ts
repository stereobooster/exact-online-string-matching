import { bdb } from "../lib/braindb.mjs";
import { type TimelineItem } from "./timeline";

export async function publications() {
  return (await bdb.documents())
    .map((doc) => {
      const fm = doc.frontmatter();
      if (!fm.abbreviation) return false;
      return {
        id: fm.abbreviation as string,
        year: fm.date as number,
        tooltip: " ", //doc.title(),
        // @ts-ignore
        class: fm.tags[0],
        url: doc.url(),
        out: doc
          .documentsFrom()
          .map((x) => x.frontmatter().abbreviation as string)
          .filter(Boolean),
      };
    })
    .filter(Boolean) as TimelineItem[];
}
