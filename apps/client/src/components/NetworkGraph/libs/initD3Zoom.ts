import * as d3 from "d3";

const initD3Zoom = <T extends d3.BaseType>({
  nodeWrapper,
}: {
  nodeWrapper: d3.Selection<T, unknown, null, undefined>;
}) => {
  const zoom = d3
    .zoom<SVGSVGElement, unknown>()
    .scaleExtent([0.5, 4])
    .on("zoom", (event) => {
      nodeWrapper.attr("transform", event.transform);
    });

  return zoom;
};

export default initD3Zoom;
