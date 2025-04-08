"use client";

import { useRequestDeleteFunctionNode } from "@/hooks/queries/functionNode/useRequestDeleteFunctionNode";
import { useClickOutside } from "@/hooks/useClickOutside";
import { Edit, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import UpdateFunctionNodeDialog from "./UpdateFunctionNodeDialog";

interface NodeContextMenuProps {
  position: { x: number; y: number };
  nodeId: string;
  nodeName: string;
  onClose: () => void;
}

export default function NodeContextMenu({
  position,
  nodeId,
  nodeName,
  onClose,
}: NodeContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const { deleteFunctionNode } = useRequestDeleteFunctionNode();

  useClickOutside({
    elementRef: menuRef,
    callback: () => {
      if (!openUpdateModal) onClose();
    },
  });

  // 메뉴 항목 클릭 핸들러
  const handleEdit = () => {
    setOpenUpdateModal(true);
  };

  const handleDelete = () => {
    console.log(nodeId);
    deleteFunctionNode(nodeId);
    onClose();
  };

  return (
    <>
      <motion.div
        ref={menuRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.15 }}
        style={{
          left: position.x,
          top: position.y,
          transformOrigin: "top left",
        }}
        className="absolute z-10 min-w-[180px] bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden"
      >
        {/* 노드 이름 헤더 */}
        <div className="px-4 py-3 border-b border-slate-100">
          <div className="text-sm font-medium text-slate-900 truncate">
            {nodeName}
          </div>
        </div>
        <button
          onClick={handleEdit}
          className="w-full text-left px-4 py-3 text-sm flex items-center gap-2 hover:bg-slate-50 text-slate-700"
        >
          <Edit className="h-4 w-4 text-blue-500" />
          함수 수정
        </button>
        <UpdateFunctionNodeDialog
          onClose={onClose}
          nodeId={nodeId}
          open={openUpdateModal}
          onOpenChange={setOpenUpdateModal}
        />

        {/* 메뉴 항목들 */}

        <button
          onClick={handleDelete}
          className="w-full text-left px-4 py-3 text-sm flex items-center gap-2 hover:bg-red-50 text-red-600"
        >
          <Trash2 className="h-4 w-4" />
          함수 삭제
        </button>
        <UpdateFunctionNodeDialog
          onClose={onClose}
          nodeId={nodeId}
          open={openUpdateModal}
          onOpenChange={setOpenUpdateModal}
        />
      </motion.div>
    </>
  );
}
