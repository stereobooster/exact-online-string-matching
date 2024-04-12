export type TimelineItem = {
  id: string;
  year: number;
  tooltip?: string;
  class?: string;
  label?: string;
  url?: string;
  in?: string[];
  out?: string[];
};

export type DotTimelineProps = {
  items: TimelineItem[];
  /**
   * https://www.graphviz.org/doc/info/attrs.html#d:rankdir
   */
  direction?: "TB" | "BT" | "LR" | "RL";
};

export function dotTimeline({ items, direction }: DotTimelineProps) {
  const byYears: Record<string, string[]> = {};

  items.forEach((item) => {
    byYears[item.year] = byYears[item.year] || [];
    byYears[item.year].push(item.id);
  });

  return `digraph timeline {
    ${direction ? `rankdir=${direction}` : ""}
    bgcolor="transparent";
    size="7,8";

    edge [style=invis];
    node [fontsize=24, shape = plaintext];

    ${Object.keys(byYears).sort().join(` -> `)}
    0[label=" "]

    node [fontsize=20, shape = box];

    ${Object.keys(byYears)
      .sort()
      .map(
        (year) =>
          `{ rank=same; "${year}" ${byYears[year]
            .map((x) => `"${x}"`)
            .join(" ")}; }`
      )
      .join("\n")}

    edge[style=solid];

    ${items
      .map(
        (item) =>
          `"${item.id}"[${item.url ? `URL="${item.url}"` : ""} ${
            item.label ? `label="${item.label}"` : ""
          } ${item.class ? `class="${item.class}"` : ""} ${
            item.tooltip ? `tooltip="${item.tooltip}"` : ""
          }];`
      )
      .join("\n")}

    ${items
      .map((item) =>
        !item.in
          ? ""
          : item.in.map((id) => `"${id}" -> "${item.id}";`).join("\n")
      )
      .join("\n")}

    ${items
      .map((item) =>
        !item.out
          ? ""
          : item.out.map((id) => `"${item.id}" -> "${id}";`).join("\n")
      )
      .join("\n")}
}`;
}
