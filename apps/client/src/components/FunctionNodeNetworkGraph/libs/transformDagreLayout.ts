import dagre from "@dagrejs/dagre";
import { Edge, Node } from "@xyflow/react";

const nodeWidth = 180;
const nodeHeight = 60;

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

export const layoutElements = function (nodes: Node[], edges: Edge[]) {
  dagreGraph.setGraph({
    rankdir: "TB",
    ranksep: 300, // 세로 간격 (row 간 거리)
    nodesep: 200,
  }); // Top-Bottom 방향

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  return nodes.map((node) => {
    const { x, y } = dagreGraph.node(node.id);
    return {
      ...node,
      position: { x, y },
      targetPosition: "top",
      sourcePosition: "bottom",
    };
  });
};
