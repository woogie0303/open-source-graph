import * as d3 from "d3";
import { FunctionNode, LinkDatum } from "../types/nodeType";

const initD3Node = <T extends d3.BaseType>({
  data,
  nodeWrapper,
  onNodeClick,
}: {
  data: FunctionNode[];
  nodeWrapper: d3.Selection<T, unknown, null, undefined>;
  onNodeClick: (el: FunctionNode) => void;
}) => {
  const nodes = data;
  const links: LinkDatum[] = [];
  nodes.forEach((node) => {
    node.connections.forEach((targetId) => {
      links.push({
        source: node.id,
        target: targetId,
        type: "calls",
      });
    });
  });

  const link = nodeWrapper
    .append("g")
    .selectAll("line")
    .data(links)
    .join("line")
    .attr("stroke", "#E2E8F0")
    .attr("stroke-width", 1.5)
    .attr("stroke-opacity", 1)
    .attr("marker-end", "url(#arrowhead)");

  // ✅ 노드 그룹 추가
  const node = nodeWrapper
    .append("g")
    .selectAll("g")
    .data(nodes)
    .join("g")
    .on("click", (event, d) => {
      event.stopPropagation();
      onNodeClick(d);
    });

  node
    .append("circle")
    .attr("r", 28)
    .attr("fill", "#F8FAFC")
    .attr("stroke", "#E2E8F0")
    .attr("stroke-width", 1.5);
  node
    .append("text")
    .text((d) => d.name)
    .attr("font-size", 12)
    .attr("fill", "#64748B")
    .attr("text-anchor", "middle")
    .attr("dy", 4);

  return { node, link, nodes, links };
};

export default initD3Node;
