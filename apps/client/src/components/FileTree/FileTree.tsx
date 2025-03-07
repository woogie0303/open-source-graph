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

  return (
    <div className="h-full flex flex-col">
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
          onMove={(node) => {
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
