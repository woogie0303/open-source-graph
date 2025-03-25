import {
  requestDeleteFileTreeNode,
  RequestDeleteFileTreeNode,
} from "@/apis/request/fileTree";
import { QUERY_KEYS } from "@/constant/queryKey";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useRequestDeleteFileTreeNode = () => {
  const queryClient = useQueryClient();
  const { mutate, ...rest } = useMutation({
    mutationFn: ({ id }: RequestDeleteFileTreeNode) =>
      requestDeleteFileTreeNode({ id }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.fileTree] });
    },
  });

  return {
    deleteFileTreeNode: mutate,
    ...rest,
  };
};
