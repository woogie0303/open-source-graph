import { useRequestCreateFileTreeNode } from "@/hooks/queries/fileTreeNode/useRequestCreateFileTreeNode";
import { useRequestUpdateFileTreeNodeName } from "@/hooks/queries/fileTreeNode/useRequestUpdateFileTreeNodeName";
import { FilePlus, FolderPlus } from "lucide-react";
import { useRef } from "react";
import { Tree, TreeApi, useSimpleTree } from "react-arborist";
import useResizeObserver from "use-resize-observer";
import FileNode from "./FileNode";
import { data, DataType } from "./mockData";

const Arborist = () => {
  const treeRef = useRef<TreeApi<DataType>>(null);
  const { ref, width, height } = useResizeObserver();
  const [fileTreeData, controller] = useSimpleTree(data);
  const { createFileTreeNode } = useRequestCreateFileTreeNode();
  const { updateFileTreeNodeName } = useRequestUpdateFileTreeNodeName();

  return (
    <div className="h-inherit flex flex-col border-r bg-background border-slate-200 w-[300px] p-5">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium text-slate-700">Files</h3>
        <div className="gap-2 flex">
          <button onClick={() => treeRef.current!.createInternal()}>
            <FolderPlus className="size-5" />
          </button>
          <button onClick={() => treeRef.current!.createLeaf()}>
            <FilePlus className="size-5" />
          </button>
        </div>
      </div>

      <div ref={ref} className="h-full">
        <Tree
          ref={treeRef}
          data={fileTreeData}
          width={width}
          height={height}
          rowHeight={40}
          {...controller}
          onRename={(node) => {
            // TODO: find 조회해보기
            updateFileTreeNodeName({ id: node.id, newName: node.name });
            controller.onRename(node);
          }}
          onDelete={(node) => {
            controller.onDelete(node);
          }}
          onCreate={async (node) => {
            const newNodeId = await createFileTreeNode({
              name: "",
              parentId: node.parentId,
              index: node.index,
              isFolder: node.type === "internal" ? true : false,
            });
            console.log(newNodeId);
            return null;
          }}
          onMove={(node) => {
            console.log(node);
            controller.onMove(node);
          }}
        >
          {FileNode}
        </Tree>
      </div>
    </div>
  );
};

export default Arborist;
