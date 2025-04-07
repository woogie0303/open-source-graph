import { useRequestGetFunctionNodes } from "@/hooks/queries/functionNode/useRequestGetFunctionNodes";
import dagre from "@dagrejs/dagre";
import {
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  ReactFlow,
  ReactFlowProps,
  ReactFlowProvider,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { RefAttributes, useEffect, useRef, useState } from "react";
import { JSX } from "react/jsx-runtime";

const nodeWidth = 180;
const nodeHeight = 60;

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

function layoutElements(nodes: Node[], edges: Edge[]) {
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
}

function Flow(
  props: JSX.IntrinsicAttributes &
    ReactFlowProps<Node, Edge> &
    RefAttributes<HTMLDivElement>,
) {
  const flowRef = useRef<HTMLDivElement>(null);

  return (
    <ReactFlow ref={flowRef} {...props}>
      <Background />
    </ReactFlow>
  );
}

export default function ReactflowGraph() {
  const { functionNodes } = useRequestGetFunctionNodes();
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  useEffect(() => {
    if (functionNodes) {
      const baseNodes = functionNodes.map((node) => ({
        id: node.id,
        data: { label: node.name },
        position: { x: 0, y: 0 },
        style: {
          width: nodeWidth,
          height: nodeHeight,
        },
      }));

      const baseEdges = functionNodes.flatMap((node) =>
        node.connection.map((connId) => ({
          id: `e-${node.id}-${connId}`,
          source: node.id,
          target: connId,
          style: {
            strokeWidth: 2,
            stroke: "#EAEAEA",
          },
        })),
      );

      const laidOutNodes = layoutElements(baseNodes, baseEdges) as Node[];
      setNodes(laidOutNodes);
      setEdges(baseEdges);
    }
  }, [functionNodes]);

  const onNodesChange = (changes: NodeChange<Node>[]) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  };

  const onEdgesChange = (changes: EdgeChange<Edge>[]) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  };

  const handleNodeClick = (_: unknown, clickedNode: Node) => {
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
  console.log(edges);
  return (
    <div className="size-full">
      <ReactFlowProvider>
        <Flow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={handleNodeClick}
          fitView
        />
      </ReactFlowProvider>
    </div>
  );
}
