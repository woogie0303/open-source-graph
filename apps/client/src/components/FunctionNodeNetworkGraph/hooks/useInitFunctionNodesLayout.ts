import { ResponseGetFunctionNode } from "@/apis/request/functionNode";
import {
  applyEdgeChanges,
  applyNodeChanges,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
} from "@xyflow/react";
import { useEffect, useState } from "react";
import { layoutElements } from "../libs/transformDagreLayout";

export const useInitFunctionNodesLayout = (
  functionNodes: ResponseGetFunctionNode[] | undefined,
) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const onNodesChange = (changes: NodeChange<Node>[]) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  };

  const onEdgesChange = (changes: EdgeChange<Edge>[]) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  };

  useEffect(() => {
    if (functionNodes) {
      const baseNodes = functionNodes.map((node) => ({
        id: node.id,
        data: { label: node.name },
        position: { x: 0, y: 0 },
      }));

      const baseEdges = functionNodes.flatMap((node) =>
        node.connection.map((connId) => {
          return {
            id: `e-${node.id}-${connId}`,
            source: connId,
            target: node.id,
            style: {
              strokeWidth: 2,
              stroke: "#EAEAEA",
            },
          };
        }),
      );

      const laidOutNodes = layoutElements(baseNodes, baseEdges) as Node[];
      setNodes(laidOutNodes);
      setEdges(baseEdges);
    }
  }, [functionNodes]);

  return {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
  };
};
