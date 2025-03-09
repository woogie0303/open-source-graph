import { BaseType } from "d3";

const initD3NodeWrapper = <T extends BaseType>({
  container,
  width,
  height,
}: {
  container: d3.Selection<T, unknown, null, undefined>;
  width: number;
  height: number;
}) => {
  const svg = container;
  svg.selectAll("*").remove();
  svg.attr("width", width).attr("height", height);

  svg
    .append("rect")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("fill", "#ffffff");

  svg
    .append("defs")
    .append("marker")
    .attr("id", "arrowhead")
    .attr("viewBox", "-0 -5 10 10")
    .attr("refX", 28)
    .attr("refY", 0)
    .attr("orient", "auto")
    .attr("markerWidth", 16)
    .attr("markerHeight", 16)
    .append("svg:path")
    .attr("d", "M -2,-4 L 4,0 L -2,4")
    .attr("fill", "#94A3B8");

  const nodeWrapper = svg.append("g");

  return { nodeWrapper };
};

export default initD3NodeWrapper;
