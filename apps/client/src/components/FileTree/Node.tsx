import { ArrowDown, ArrowRight, Edit, File, Folder, X } from "lucide-react";
import { NodeRendererProps } from "react-arborist";
import { DataType } from "./mockData";

const Node = ({
  node,
  style,
  dragHandle,
  tree,
}: NodeRendererProps<DataType>) => {
  return (
    <div
      style={style}
      ref={dragHandle}
      className="flex mb-2 group items-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0 h-9 rounded-md px-3 w-full justify-between gap-2 hover:bg-slate-100 text-slate-400 hover:text-slate-800"
      onClick={() => node.isInternal && node.toggle()}
    >
      <div className="flex items-center gap-1">
        {node.isLeaf ? (
          <>
            <span className="file-folder-icon">
              <File color="#6bc7f6" />
            </span>
          </>
        ) : (
          <>
            <span className="arrow">
              {node.isOpen ? <ArrowDown /> : <ArrowRight />}
            </span>
            <span className="">
              <Folder color="#f6cf60" />
            </span>
          </>
        )}
        <span className="node-text">
          {node.isEditing ? (
            <input
              type="text"
              defaultValue={node.data.name}
              onFocus={(e) => e.currentTarget.select()}
              onBlur={() => node.reset()}
              onKeyDown={(e) => {
                if (e.key === "Escape") node.reset();
                if (e.key === "Enter") node.submit(e.currentTarget.value);
              }}
              autoFocus
            />
          ) : (
            <span>{node.data.name}</span>
          )}
        </span>
      </div>

      <div className="group-hover:visible invisible flex gap-2">
        <button onClick={() => node.edit()} title="Rename...">
          <Edit />
        </button>
        <button onClick={() => tree.delete(node.id)} title="Delete">
          <X />
        </button>
      </div>
    </div>
  );
};

export default Node;
