import { ResponseGetFunctionNode } from "@/apis/request/functionNode";
import { Node } from "@xyflow/react";
import { useState } from "react";

const useActiveContextMenu = (
  functionNodes: ResponseGetFunctionNode[] | undefined,
) => {
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    position: { x: 0, y: 0 },
    nodeId: "",
    nodeName: "",
  });
  const onNodeContextMenu = (event: React.MouseEvent, node: Node) => {
    event.preventDefault();
    if (!functionNodes) return;

    const functionData = functionNodes.find((item) => item.id === node.id);
    if (!functionData) return;

    setContextMenu({
      visible: true,
      position: { x: event.clientX, y: event.clientY },
      nodeId: node.id,
      nodeName: functionData.name,
    });
  };

  const closeContextMenu = () => {
    setContextMenu((prev) => ({ ...prev, visible: false }));
  };

  return { contextMenu, onNodeContextMenu, closeContextMenu };
};

export default useActiveContextMenu;
