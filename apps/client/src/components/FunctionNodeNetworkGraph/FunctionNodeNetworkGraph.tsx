import { useMemo, useState } from "react";

import { useRequestGetFunctionNodes } from "@/hooks/queries/functionNode/useRequestGetFunctionNodes";
import FunctionNodeInform from "./FunctionNodeInform";
import NetworkGraph from "./NetworkGraph";

export default function FunctionNodeNetworkGraph() {
  const [activeNode, setActiveNode] = useState<{
    id: string;
    x: number;
    y: number;
  } | null>(null);

  const { functionNodes } = useRequestGetFunctionNodes();

  const activeNodeData = useMemo(() => {
    if (functionNodes && activeNode) {
      return functionNodes.find((el) => el.id === activeNode?.id);
    }
  }, [activeNode, functionNodes]);

  const data = useMemo(
    () =>
      functionNodes &&
      functionNodes.map((el) => ({
        id: el.id,
        name: el.name,
        file: el.fileId,
        connections: el.connection,
      })),
    [functionNodes],
  );

  return (
    <>
      {data && (
        <NetworkGraph
          data={data}
          activeNode={activeNode}
          onNodeClick={(activeNode: { id: string; x: number; y: number }) => {
            setActiveNode(activeNode);
          }}
        />
      )}
      {activeNodeData && (
        <FunctionNodeInform
          activeNode={{
            codeText: activeNodeData.codeText,
            editorBlock: activeNodeData.editorBlock,
          }}
          onClose={() => {
            setActiveNode(null);
          }}
        />
      )}
    </>
  );
}
