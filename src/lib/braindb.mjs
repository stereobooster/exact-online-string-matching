import { slug as githubSlug } from "github-slugger";
import path from "node:path";
import process from "node:process";
import { BrainDB } from "@braindb/core";
// import { dirname } from "node:path";
// import { mkdirp } from "mkdirp";
// import { writeFileSync } from "node:fs";

// slug implementation according to Astro
// see astro/packages/astro/src/content/utils.ts
const generateSlug = (filePath) => {
  const withoutFileExt = filePath.replace(
    new RegExp(path.extname(filePath) + "$"),
    ""
  );
  const rawSlugSegments = withoutFileExt.split(path.sep);
  const slug = rawSlugSegments
    // Slugify each route segment to handle capitalization and spaces.
    // Note: using `slug` instead of `new Slugger()` means no slug deduping.
    .map((segment) => githubSlug(segment))
    .join("/")
    .replace(/\/index$/, "");

  return slug;
};

const start = new Date().getTime();

export const bdb = new BrainDB({
  root: path.resolve(process.cwd(), "src/content/docs"),
  url: (filePath, _frontmatter) => `${generateSlug(filePath)}/`,
  git: process.cwd(),
  storeMarkdown: false,
  // need to configure caching in Netlify in order to use this
  // - https://github.com/siakaramalegos/netlify-plugin-cache-folder
  // - https://github.com/netlify/build/tree/main/packages/cache-utils
  // dbPath: process.cwd(),
});

bdb.start();

// let first = false;
bdb.on("*", (action, opts) => {
  // if (first && action === "create" && opts.document.frontmatter().tags) {
  //   let md = opts.document.markdown();
  //   const regexp = /\((\d+)\)/g;

  //   [...md.matchAll(regexp)].forEach((x) => {
  //     const id = parseInt(x[1]);
  //     const docs = bdb.documentsSync({
  //       frontmatter: { sidebar: { order: id } },
  //     });
  //     const doc = docs[0];
  //     if (doc) {
  //       md = md.replaceAll(x[0], `[[${doc.slug()}]]`);
  //     } else {
  //       console.log(`Failed to find ${x[0]}`);
  //     }
  //   });

  //   const mdPath = process.cwd() + `/tmp` + opts.document.path();
  //   mkdirp.sync(dirname(mdPath));
  //   writeFileSync(mdPath, md, {
  //     encoding: "utf8",
  //   });
  //   // first = false;
  // }

  if (action === "ready")
    console.log(`BrainDB ready: ${new Date().getTime() - start}ms`);

  if (opts) {
    opts.document
      .unresolvedLinks()
      .forEach((link) =>
        console.log(
          `Unresolved link: ${link
            .from()
            .path()}:${link.line()}:${link.column()}`
        )
      );
  }
});
