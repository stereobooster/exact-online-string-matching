import { publications } from "../components/publications";
import { dotTimeline } from "../components/timeline";
import { Graphviz as GraphvizWasm } from "@hpcc-js/wasm/graphviz";
const graphviz = await GraphvizWasm.load();

export async function GET({}) {
  let svg = graphviz.dot(dotTimeline({ items: await publications() }));
  return new Response(svg, {
    headers: { "Content-Type": "image/svg+xml" },
  });
}
