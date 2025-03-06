import { FilePlus, FolderPlus } from "lucide-react";
import { useRef } from "react";
import { Tree, TreeApi } from "react-arborist";
import useResizeObserver from "use-resize-observer";
import { data, DataType } from "./mockData";
import Node from "./Node";

const Arborist = () => {
  const treeRef = useRef<TreeApi<DataType>>(null);
  const { ref, width, height } = useResizeObserver();

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium text-lg text-slate-900">Files</h3>
        <div className="gap-2 flex">
          <button onClick={() => treeRef.current!.createInternal()}>
            <FolderPlus className="size-5" />
          </button>
          <button onClick={() => treeRef.current!.createLeaf()}>
            <FilePlus className="size-5" />
          </button>
        </div>
      </div>
      {/* TODO: 검색기능 추가 */}
      {/* <input
        type="text"
        placeholder="Search..."
        className="search-input"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      /> */}
      <div ref={ref} className="h-full">
        <Tree
          ref={treeRef}
          initialData={data}
          width={width}
          height={height}
          rowHeight={40}
          // searchTerm={term}
          searchMatch={(node, term) =>
            node.data!.name.toLowerCase().includes(term.toLowerCase())
          }
        >
          {Node}
        </Tree>
      </div>
    </div>
  );
};

export default Arborist;
