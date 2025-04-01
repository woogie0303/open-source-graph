import {
  requestCreateFunctionNode,
  RequestCreateFunctionNode,
} from "@/apis/request/functionNode";
import { QUERY_KEYS } from "@/constant/queryKey";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useRequestCreateFunctionNode = () => {
  const queryClient = useQueryClient();
  const { mutate, ...rest } = useMutation({
    mutationFn: (arg: RequestCreateFunctionNode) => {
      return requestCreateFunctionNode(arg);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.functionNode] });
    },
  });

  return { createFunctionNode: mutate, ...rest };
};
