import { useMemo, useState } from "react";

import { useRequestGetFunctionNodes } from "@/hooks/queries/functionNode/useRequestGetFunctionNodes";
import FunctionNodeInform from "./FunctionNodeInform";
import NetworkGraph from "./NetworkGraph";

export default function FunctionNodeNetworkGraph() {
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);

  const { functionNodes } = useRequestGetFunctionNodes();

  const activeNode = useMemo(() => {
    if (functionNodes) {
      return functionNodes.find((el) => el.id === activeNodeId);
    }
  }, [activeNodeId, functionNodes]);

  return (
    <>
      {functionNodes && (
        <NetworkGraph
          data={functionNodes.map((el) => ({
            id: el.id,
            name: el.name,
            file: el.fileId,
            connections: el.connection,
          }))}
          onNodeClick={(activeNodeId: string) => {
            setActiveNodeId(activeNodeId);
          }}
        />
      )}
      {activeNode && (
        <FunctionNodeInform
          activeNode={{
            codeText: activeNode.codeText,
            editorBlock: activeNode.editorBlock,
          }}
          onClose={() => {
            setActiveNodeId(null);
          }}
        />
      )}
    </>
  );
}
