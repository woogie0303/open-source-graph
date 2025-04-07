import { useRequestGetFunctionNodes } from "@/hooks/queries/functionNode/useRequestGetFunctionNodes";
import { useUpdatableRef } from "@/hooks/useUpdatableRef.ts";
import {
  Background,
  Edge,
  Node,
  ReactFlow,
  ReactFlowProps,
  ReactFlowProvider,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { RefAttributes, useMemo, useRef, useState } from "react";
import { JSX } from "react/jsx-runtime";
import AddFunctionNodeDialog from "./AddFunctionNodeDialog";
import FunctionNodeInform from "./FunctionNodeInform";
import { useInitFunctionNodesLayout } from "./hooks/useInitFunctionNodesLayout";

function Flow(
  props: JSX.IntrinsicAttributes &
    ReactFlowProps<Node, Edge> &
    RefAttributes<HTMLDivElement>,
) {
  const flowRef = useRef<HTMLDivElement>(null);

  return (
    <div className="size-full relative">
      <ReactFlow className="size-full" ref={flowRef} {...props}>
        <Background />
      </ReactFlow>
      <AddFunctionNodeDialog />
    </div>
  );
}

export default function FunctionNodeGraph() {
  const { functionNodes } = useRequestGetFunctionNodes();
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const activeNodeIdRef = useUpdatableRef(activeNodeId);

  const activeNodeData = useMemo(() => {
    if (functionNodes && activeNodeId) {
      return functionNodes.find((el) => el.id === activeNodeId);
    }
  }, [activeNodeId, functionNodes]);
  const { onEdgesChange, onNodeClick, onNodesChange, nodes, edges } =
    useInitFunctionNodesLayout(functionNodes, activeNodeIdRef);

  return (
    <div className="size-full flex">
      <ReactFlowProvider>
        <Flow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={(event, node) => {
            onNodeClick(event, node);
            setActiveNodeId(node.id);
          }}
          fitView
        />
      </ReactFlowProvider>
      {activeNodeData && (
        <FunctionNodeInform
          key={activeNodeData.id}
          activeNode={{
            id: activeNodeData.id,
            codeText: activeNodeData.codeText,
            editorBlock: activeNodeData.editorBlock,
            name: activeNodeData.name,
          }}
          onClose={() => {
            setActiveNodeId(null);
          }}
        />
      )}
    </div>
  );
}
