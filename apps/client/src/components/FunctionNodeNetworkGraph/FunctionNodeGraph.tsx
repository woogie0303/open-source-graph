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
import { AnimatePresence } from "motion/react";
import { RefAttributes, useCallback, useMemo, useRef, useState } from "react";
import { JSX } from "react/jsx-runtime";
import AddFunctionNodeDialog from "./AddFunctionNodeDialog";
import FunctionNodeInform from "./FunctionNodeInform";
import { useInitFunctionNodesLayout } from "./hooks/useInitFunctionNodesLayout";
import NodeContextMenu from "./NodeContextMenu";

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
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    position: { x: 0, y: 0 },
    nodeId: "",
    nodeName: "",
  });
  const onNodeContextMenu = useCallback(
    (event: React.MouseEvent, node: Node) => {
      // 기본 컨텍스트 메뉴 방지
      event.preventDefault();
      if (!functionNodes) return;
      // 노드 데이터 찾기
      const functionData = functionNodes.find((item) => item.id === node.id);
      if (!functionData) return;

      // 컨텍스트 메뉴 위치 설정 (마우스 위치 기준)
      setContextMenu({
        visible: true,
        position: { x: event.clientX, y: event.clientY },
        nodeId: node.id,
        nodeName: functionData.name,
      });
    },
    [functionNodes],
  );
  return (
    <div className="size-full flex">
      <ReactFlowProvider>
        <Flow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeContextMenu={onNodeContextMenu}
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
      {/* 컨텍스트 메뉴 */}
      <AnimatePresence>
        {contextMenu.visible && (
          <NodeContextMenu
            position={contextMenu.position}
            nodeId={contextMenu.nodeId}
            nodeName={contextMenu.nodeName}
            onClose={() =>
              setContextMenu((prev) => ({ ...prev, visible: false }))
            }
          />
        )}
      </AnimatePresence>
    </div>
  );
}
