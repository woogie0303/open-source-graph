import {
  RequestCreateFileTreeNode,
  requestCreateFileTreeNode,
} from "@/apis/request/fileTree";
import { QUERY_KEYS } from "@/constant/queryKey";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useRequestCreateFileTreeNode = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, ...rest } = useMutation({
    mutationFn: ({
      name,
      parentId,
      isFolder,
      index,
    }: RequestCreateFileTreeNode) =>
      requestCreateFileTreeNode({ name, parentId, isFolder, index }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.fileTree] });
    },
  });

  return { createFileTreeNode: mutateAsync, ...rest };
};
