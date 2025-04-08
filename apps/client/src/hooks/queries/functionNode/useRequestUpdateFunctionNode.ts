import {
  RequestUpdateFunctionNode,
  requestUpdateFunctionNode,
} from "@/apis/request/functionNode";
import { QUERY_KEYS } from "@/constant/queryKey";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";

export const useRequestUpdateFunctionNode = () => {
  const queryClient = useQueryClient();
  const { fileId } = useParams();

  const { mutate, ...rest } = useMutation({
    mutationFn: (updateNode: RequestUpdateFunctionNode) =>
      requestUpdateFunctionNode(updateNode),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.functionNodeAll(fileId!)],
      });
    },
  });

  return { updateFunctionNode: mutate, ...rest };
};
