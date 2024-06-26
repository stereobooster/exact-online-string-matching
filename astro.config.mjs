import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import rehypeExternalLinks from "rehype-external-links";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import robotsTxt from "astro-robots-txt";

import remarkWikiLink from "@braindb/remark-wiki-link";
import { bdb } from "./src/lib/braindb.mjs";

await bdb.ready();

// https://astro.build/config
export default defineConfig({
  site: "https://exact.stereobooster.com",
  integrations: [
    starlight({
      title: "Exact Online String Matching",
      social: {
        github: "https://github.com/stereobooster/exact-online-string-matching",
      },
      editLink: {
        baseUrl:
          "https://github.com/stereobooster/exact-online-string-matching/edit/main/",
      },
      sidebar: [
        {
          label: "Algorithms",
          collapsed: true,
          autogenerate: {
            directory: "algorithms",
          },
        },
      ],
      customCss: ["./src/styles/custom.css"],
      components: {
        PageFrame: "./src/components/PageFrame.astro",
        TableOfContents: "./src/components/TableOfContents.astro",
        // Hero: "./src/components/Hero.astro",
      },
      lastUpdated: true,
    }),
    robotsTxt(),
  ],
  markdown: {
    remarkPlugins: [
      remarkMath,
      [
        remarkWikiLink,
        {
          linkTemplate: ({ slug, alias }) => {
            const [slugWithoutAnchor, anchor] = slug.split("#");
            const doc = bdb.documentsSync({ slug: slugWithoutAnchor })[0];
            if (doc) {
              return {
                hName: "a",
                hProperties: {
                  href: anchor ? `${doc.url()}#${anchor}` : doc.url(),
                },
                hChildren: [
                  {
                    type: "text",
                    value: alias == null ? doc.frontmatter().title : alias,
                  },
                ],
              };
            } else {
              return {
                hName: "span",
                hProperties: {
                  class: "broken-link",
                  title: `Can't resolve link to ${slug}`,
                },
                hChildren: [{ type: "text", value: alias || slug }],
              };
            }
          },
        },
      ],
    ],
    rehypePlugins: [
      rehypeHeadingIds,
      [rehypeAutolinkHeadings, { behavior: "append" }],
      [
        rehypeExternalLinks,
        {
          content: { type: "text", value: " ↗" }, // ⤴
          contentProperties: { "aria-hidden": true, class: "no-select" },
        },
      ],
      rehypeKatex,
    ],
  },
  vite: {
    ssr: {
      noExternal: ["katex"],
    },
    optimizeDeps: {
      exclude: ["fsevents", "@node-rs", "@napi-rs"],
    },
  },
});
