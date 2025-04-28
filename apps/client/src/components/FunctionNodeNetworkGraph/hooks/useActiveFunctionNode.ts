import { ResponseGetFunctionNode } from "@/apis/request/functionNode";
import { Edge, EdgeReplaceChange } from "@xyflow/react";
import { useEffect, useMemo, useState } from "react";

const useActiveFunctionNode = (
  functionNodes: ResponseGetFunctionNode[] | undefined,
) => {
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const activeNodeData = useMemo(() => {
    if (functionNodes && activeNodeId) {
      return functionNodes.find((el) => el.id === activeNodeId);
    }
  }, [activeNodeId, functionNodes]);

  const updateActiveNodeAndEdges = ({
    edges,
    activeNodeId,
  }: {
    edges: Edge[];
    activeNodeId: string;
  }): EdgeReplaceChange<Edge>[] => {
    setActiveNodeId(activeNodeId);

    return edges.map((edge) => {
      const isActive =
        edge.source === activeNodeId || edge.target === activeNodeId;

      return {
        id: edge.id,
        type: "replace",
        item: {
          ...edge,
          animated: isActive,
          style: {
            strokeWidth: 2,
            stroke: isActive ? "#3b82f6" : "#EAEAEA",
          },
        },
      };
    });
  };

  const clearActiveNodeAndEdges = ({
    edges,
  }: {
    edges: Edge[];
  }): EdgeReplaceChange<Edge>[] => {
    setActiveNodeId(null);

    return edges.map((edge) => {
      return {
        id: edge.id,
        type: "replace",
        item: {
          ...edge,
          animated: false,
          style: {
            strokeWidth: 2,
            stroke: "#EAEAEA",
          },
        },
      };
    });
  };
  useEffect(() => {
    // 새로운 함수 노드 추가시  invalidateQueries가 적용될때 activeNodeInform unmount 안되는 오류 해결
    setActiveNodeId(null);
  }, [functionNodes]);
  return {
    updateActiveNodeAndEdges,
    clearActiveNodeAndEdges,
    activeNodeData,
  };
};

export default useActiveFunctionNode;
