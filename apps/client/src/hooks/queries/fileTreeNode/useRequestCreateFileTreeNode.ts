import {
  RequestCreateFileTreeNode,
  requestCreateFileTreeNode,
} from "@/apis/request/fileTree";
import { useMutation } from "@tanstack/react-query";

export const useRequestCreateFileTreeNode = () => {
  const { mutate, ...rest } = useMutation({
    mutationFn: ({ name, parentId, isFolder }: RequestCreateFileTreeNode) =>
      requestCreateFileTreeNode({ name, parentId, isFolder }),
  });

  return { createFileTreeNode: mutate, ...rest };
};
