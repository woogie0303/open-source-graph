import { useRequestGetFunctionNodes } from "@/hooks/queries/functionNode/useRequestGetFunctionNodes";
import {
  applyEdgeChanges,
  applyNodeChanges,
  Edge,
  EdgeChange,
  MarkerType,
  Node,
  NodeChange,
  ReactFlow,
  ReactFlowProps,
  ReactFlowProvider,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { RefAttributes, useEffect, useRef, useState } from "react";
import { JSX } from "react/jsx-runtime";

function Flow(
  props: JSX.IntrinsicAttributes &
    ReactFlowProps<Node, Edge> &
    RefAttributes<HTMLDivElement>,
) {
  // you can access the internal state here
  const { setViewport } = useReactFlow();
  const flowRef = useRef<HTMLDivElement>(null);

  return (
    <ReactFlow
      ref={flowRef}
      {...props}
      onNodeClick={(node) => {
        const w = flowRef.current?.getBoundingClientRect().width;
        const h = flowRef.current?.getBoundingClientRect().height;

        const newX = w! - node.clientX;
        const newY = h! - node.clientY;
        setViewport({ x: newX, y: newY, zoom: 2 }, { duration: 800 });
      }}
    />
  );
}

export default function ReactflowGraph() {
  const { functionNodes } = useRequestGetFunctionNodes();
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  useEffect(() => {
    console.log(1);
    if (functionNodes) {
      setNodes(
        functionNodes.map((node) => ({
          id: node.id,
          data: { label: node.name },
          position: { x: Math.random() * 800, y: Math.random() * 600 }, // 기본 배치
        })),
      );
      setEdges(
        functionNodes.flatMap((node) =>
          node.connection.map((connId) => ({
            id: `e-${node.id}-${connId}`,
            source: node.id,
            target: connId,
            markerEnd: {
              type: MarkerType.ArrowClosed,
              width: 20,
              height: 20,
              color: "#FF0072",
            },
            label: "marker size and color",
            style: {
              strokeWidth: 2,
              stroke: "#FF0072",
            },
          })),
        ),
      );
    }
  }, [functionNodes]);

  const onNodesChange = (changes: NodeChange<Node>[]) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  };

  const onEdgesChange = (changes: EdgeChange<Edge>[]) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  };

  return (
    <div className="size-full">
      <ReactFlowProvider>
        <Flow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
        />
      </ReactFlowProvider>
    </div>
  );
}
