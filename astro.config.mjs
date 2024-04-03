import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import rehypeExternalLinks from "rehype-external-links";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkMermaidjs from "remark-mermaidjs";
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import Icons from "unplugin-icons/vite";

import { wikiLinkPlugin } from "@stereobooster/remark-wiki-link";
import { bdb } from "./src/lib/braindb.mjs";

await bdb.ready();

// https://astro.build/config
export default defineConfig({
  site: "https://exact-online-string-matching.stereobooster.com",
  integrations: [
    starlight({
      title: "Exact Online String Matching Bibliography",
      social: {
        github: "https://github.com/stereobooster/exact-online-string-matching",
      },
      editLink: {
        baseUrl:
          "https://github.com/stereobooster/exact-online-string-matching/edit/main/",
      },
      sidebar: [
        { label: "Introduction", link: "/" },
        {
          label: "Algorithms",
          // collapsed: true,
          autogenerate: {
            directory: "algorithms",
          },
        },
      ],
      customCss: ["./src/styles/custom.css"],
      components: {
        PageFrame: "./src/components/PageFrame.astro",
        // TableOfContents: "./src/components/TableOfContents.astro",
        // TODO: astro:page-load
        // Head: './src/components/Head.astro',
        // Sidebar: "./src/components/Sidebar.astro",
      },
      lastUpdated: true,
    }),
  ],
  markdown: {
    remarkPlugins: [
      remarkMath,
      remarkMermaidjs,
      [
        wikiLinkPlugin,
        {
          aliasDivider: "|",
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
    plugins: [
      Icons({
        compiler: "astro",
      }),
    ],
  },
});
