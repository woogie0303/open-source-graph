import { ResponseFileTreeNode } from "@/apis/request/fileTree";
import { useRouter } from "@/libs/router/hooks/useRouter";
import cn from "@/utils/cn";
import { Edit, File, Folder, X } from "lucide-react";
import { JSX } from "react";
import { NodeRendererProps } from "react-arborist";
import { useParams } from "react-router";

function NodeLabel({
  icon,
  isEditing,
  name,
  onKeyDown,
  onBlur,
}: {
  icon: JSX.Element;
  isEditing: boolean;
  name: string;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onBlur: () => void;
}) {
  return (
    <div className="flex items-center gap-1 ml-3">
      {icon}
      {isEditing ? (
        <input
          type="text"
          className="w-[100px]"
          defaultValue={name}
          onFocus={(e) => e.currentTarget.select()}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          autoFocus
        />
      ) : (
        <span className="w-[100px] truncate">{name}</span>
      )}
    </div>
  );
}

function NodeActions({
  onRenameHandler,
  onDeleteHandler,
}: {
  onRenameHandler: () => void;
  onDeleteHandler: () => void;
}) {
  return (
    <div className="group-hover:visible invisible flex gap-2">
      <button onClick={onRenameHandler} title="Rename..." aria-label="rename">
        <Edit />
      </button>
      <button
        aria-label="delete"
        onClick={(e) => {
          e.stopPropagation();
          onDeleteHandler();
        }}
        title="Delete"
      >
        <X />
      </button>
    </div>
  );
}

function FileNode({
  node,
  tree,
  style,
}: NodeRendererProps<ResponseFileTreeNode>) {
  const nodeLabelKeyDownHandler = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Escape") node.reset();
    if (e.key === "Enter") node.submit(e.currentTarget.value);
  };

  const nodeLabelBlurHandler = () => {
    if (node.data.name === "") {
      tree.delete(node.id);
      return;
    }
    node.reset();
  };

  const isActive = node.isEditing || (node.isSelected && node.isLeaf);
  const router = useRouter();
  const params = useParams();

  return (
    <div
      style={style}
      className={cn(
        "flex cursor-pointer p-2 mb-2 group items-center whitespace-nowrap w-full font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0 h-9 rounded-md px-3  justify-between gap-2 hover:bg-primary-100 text-slate-600",
        isActive && "bg-primary-100",
        params.fileId === node.data.id && "bg-primary-100",
      )}
      onClick={() => {
        if (node.isInternal) {
          node.toggle();
          return;
        }

        router.push("/function-nodes/:fileId", {
          params: { fileId: node.data.id },
        });
      }}
    >
      <NodeLabel
        icon={
          node.isLeaf ? (
            <File className="text-primary-300" />
          ) : (
            <Folder className="text-yellow-500" />
          )
        }
        isEditing={node.isEditing}
        name={node.data.name}
        onKeyDown={nodeLabelKeyDownHandler}
        onBlur={nodeLabelBlurHandler}
      />

      <NodeActions
        onDeleteHandler={() => {
          tree.delete(node.id);
          if (node.id === params.fileId) {
            router.push("/function-nodes");
          }
        }}
        onRenameHandler={() => {
          node.edit();
        }}
      />
    </div>
  );
}

export default FileNode;
