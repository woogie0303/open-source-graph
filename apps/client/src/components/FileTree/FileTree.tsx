import { ResponseFileTreeNode } from "@/apis/request/fileTree";
import { useRequestCreateFileTreeNode } from "@/hooks/queries/fileTreeNode/useRequestCreateFileTreeNode";
import { useRequestDeleteFileTreeNode } from "@/hooks/queries/fileTreeNode/useRequestDeleteFileTreeNode";
import { useRequestGetFileTreeNode } from "@/hooks/queries/fileTreeNode/useRequestGetFileTreeNode";
import { useRequestUpdateFileTreeNodeName } from "@/hooks/queries/fileTreeNode/useRequestUpdateFileTreeNodeName";
import { FilePlus, FolderPlus } from "lucide-react";
import { useRef } from "react";
import { Tree, TreeApi } from "react-arborist";
import useResizeObserver from "use-resize-observer";
import FileNode from "./FileNode";

const Arborist = () => {
  const treeRef = useRef<TreeApi<ResponseFileTreeNode>>(null);
  const { ref, width, height } = useResizeObserver();
  const { createFileTreeNode } = useRequestCreateFileTreeNode();
  const { updateFileTreeNodeName } = useRequestUpdateFileTreeNodeName();
  const { deleteFileTreeNode } = useRequestDeleteFileTreeNode();
  const { fileTreeNode } = useRequestGetFileTreeNode();

  return (
    <section className="h-inherit flex flex-col border-r bg-background border-slate-200 w-[300px] p-5">
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
          data={fileTreeNode}
          width={width}
          height={height}
          rowHeight={40}
          onRename={(node) => {
            if (node.name === "") throw new Error("파일 이름이 비었습니다");
            updateFileTreeNodeName({ id: node.id, newName: node.name });
          }}
          onDelete={async (node) => {
            await deleteFileTreeNode({ id: node.ids[0] });
          }}
          onCreate={async (node) => {
            const newNodeId = await createFileTreeNode({
              name: "",
              parentId: node.parentId,
              isFolder: node.type === "internal" ? true : false,
            });

            treeRef.current?.edit(newNodeId);
            return newNodeId;
          }}
        >
          {FileNode}
        </Tree>
      </div>
    </section>
  );
};

export default Arborist;
