import {
  RequestCreateFileTreeNode,
  requestCreateFileTreeNode,
} from "@/apis/request/fileTree";
import { QUERY_KEYS } from "@/constant/queryKey";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useRequestCreateFileTreeNode = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, ...rest } = useMutation({
    mutationFn: ({ name, parentId, isFolder }: RequestCreateFileTreeNode) =>
      requestCreateFileTreeNode({ name, parentId, isFolder }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.fileTree] });
    },
  });

  return { createFileTreeNode: mutateAsync, ...rest };
};
