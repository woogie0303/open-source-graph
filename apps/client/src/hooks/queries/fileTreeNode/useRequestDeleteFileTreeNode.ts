import {
  requestDeleteFileTreeNode,
  RequestDeleteFileTreeNode,
} from "@/apis/request/fileTree";
import { useMutation } from "@tanstack/react-query";

export const useRequestDeleteFileTreeNode = () => {
  const { mutate, ...rest } = useMutation({
    mutationFn: ({ id }: RequestDeleteFileTreeNode) =>
      requestDeleteFileTreeNode({ id }),
  });

  return {
    deleteFileTreeNode: mutate,
    ...rest,
  };
};
