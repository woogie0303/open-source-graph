import {
  RequestCreateFileTreeNode,
  requestCreateFileTreeNode,
} from "@/apis/request/fileTree";
import { useMutation } from "@tanstack/react-query";

export const useRequestCreateFileTreeNode = () => {
  const { mutateAsync, ...rest } = useMutation({
    mutationFn: ({
      name,
      parentId,
      isFolder,
      index,
    }: RequestCreateFileTreeNode) =>
      requestCreateFileTreeNode({ name, parentId, isFolder, index }),
  });

  return { createFileTreeNode: mutateAsync, ...rest };
};
