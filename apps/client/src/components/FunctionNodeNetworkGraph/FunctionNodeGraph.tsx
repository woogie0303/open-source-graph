import { useRequestGetFunctionNodes } from "@/hooks/queries/functionNode/useRequestGetFunctionNodes";
import { Background, ReactFlow, ReactFlowProvider } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import AddFunctionNodeDialog from "./AddFunctionNodeDialog";
import FunctionNodeInform from "./FunctionNodeInform";
import useActiveContextMenu from "./hooks/useActiveContextMenu";
import useActiveFunctionNode from "./hooks/useActiveFunctionNode";
import { useInitFunctionNodesLayout } from "./hooks/useInitFunctionNodesLayout";
import NodeContextMenu from "./NodeContextMenu";

export default function FunctionNodeGraph() {
  const { functionNodes } = useRequestGetFunctionNodes();
  const { onEdgesChange, onNodesChange, nodes, edges } =
    useInitFunctionNodesLayout(functionNodes);
  const { updateActiveNodeAndEdges, clearActiveNodeAndEdges, activeNodeData } =
    useActiveFunctionNode(functionNodes);
  const { onNodeContextMenu, contextMenu, closeContextMenu } =
    useActiveContextMenu(functionNodes);

  return (
    <div className="size-full flex">
      <ReactFlowProvider>
        <div className="size-full relative">
          <ReactFlow
            className="size-full"
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeContextMenu={onNodeContextMenu}
            onNodeClick={(_, node) => {
              const animatedEdge = updateActiveNodeAndEdges({
                edges,
                activeNodeId: node.id,
              });

              onEdgesChange(animatedEdge);
            }}
            fitView
          >
            <Background />
          </ReactFlow>
          <AddFunctionNodeDialog />
        </div>
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
            const resetEdges = clearActiveNodeAndEdges({ edges });
            onEdgesChange(resetEdges);
          }}
        />
      )}
      {contextMenu.visible && (
        <NodeContextMenu
          key={contextMenu.nodeId}
          position={contextMenu.position}
          nodeId={contextMenu.nodeId}
          nodeName={contextMenu.nodeName}
          onClose={closeContextMenu}
        />
      )}
    </div>
  );
}
