import { requestDeleteFunctionNode } from "@/apis/request/functionNode";
import { QUERY_KEYS } from "@/constant/queryKey";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";

export const useRequestDeleteFunctionNode = () => {
  const queryClient = useQueryClient();
  const { fileId } = useParams();

  const { mutateAsync, ...rest } = useMutation({
    mutationFn: (deleteNodeId: string) =>
      requestDeleteFunctionNode(deleteNodeId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.functionNodeAll(fileId!)],
      });
    },
  });

  return { deleteFunctionNode: mutateAsync, ...rest };
};
