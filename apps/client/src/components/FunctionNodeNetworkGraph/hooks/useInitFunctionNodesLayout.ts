import { ResponseGetFunctionNode } from "@/apis/request/functionNode";
import {
  applyEdgeChanges,
  applyNodeChanges,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  NodeMouseHandler,
} from "@xyflow/react";
import { RefObject, useEffect, useState } from "react";
import { layoutElements } from "../libs/transformDagreLayout";

export const useInitFunctionNodesLayout = (
  functionNodes: ResponseGetFunctionNode[] | undefined,
  activeNodeIdRef: RefObject<string | null>,
) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const onNodesChange = (changes: NodeChange<Node>[]) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  };

  const onEdgesChange = (changes: EdgeChange<Edge>[]) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  };

  const onNodeClick: NodeMouseHandler<Node> = (
    _: unknown,
    clickedNode: Node,
  ) => {
    setEdges((prevEdges) =>
      prevEdges.map((edge) => {
        if (edge.source === clickedNode.id || edge.target === clickedNode.id) {
          return {
            ...edge,
            animated: true,

            style: {
              strokeWidth: 2,
              stroke: "#FF0072",
            },
          };
        }
        return {
          ...edge,
          animated: false,
          style: {
            strokeWidth: 2,
            stroke: "#EAEAEA",
          },
        }; // 선택된 것만 활성화
      }),
    );
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
          if (
            activeNodeIdRef.current === node.id ||
            activeNodeIdRef.current === connId
          ) {
            return {
              id: `e-${node.id}-${connId}`,
              source: node.id,
              target: connId,
              animated: true,
              style: {
                strokeWidth: 2,
                stroke: "#FF0072",
              },
            };
          }
          return {
            id: `e-${node.id}-${connId}`,
            source: node.id,
            target: connId,
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
  }, [activeNodeIdRef, functionNodes]);

  return {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onNodeClick,
  };
};
