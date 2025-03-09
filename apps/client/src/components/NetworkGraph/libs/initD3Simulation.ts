import * as d3 from "d3";
import { FunctionNode, LinkDatum } from "../types/nodeType";

const initD3Simulation = ({
  nodes,
  links,
  width,
  height,
  onDragHandle,
}: {
  nodes: FunctionNode[];
  links: LinkDatum[];
  width: number;
  height: number;
  onDragHandle?: (simulation: d3.Simulation<FunctionNode, undefined>) => void;
}) => {
  const simulation = d3
    .forceSimulation<FunctionNode>(nodes)
    .force(
      "link",
      d3
        .forceLink<FunctionNode, LinkDatum>(links)
        .id((d) => d.id)
        .distance(150),
    )
    .force("charge", d3.forceManyBody().strength(-300))
    .force("center", d3.forceCenter(width / 2, height / 2));

  if (onDragHandle) {
    onDragHandle(simulation);
  }

  const stopSimulation = () => {
    simulation.stop();
  };
  return stopSimulation;
};

export default initD3Simulation;
