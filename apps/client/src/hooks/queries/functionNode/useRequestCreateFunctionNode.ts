import {
  requestCreateFunctionNode,
  RequestCreateFunctionNode,
} from "@/apis/request/functionNode";
import { QUERY_KEYS } from "@/constant/queryKey";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";

export const useRequestCreateFunctionNode = () => {
  const { fileId } = useParams();
  const queryClient = useQueryClient();

  const { mutateAsync, ...rest } = useMutation({
    mutationFn: (arg: RequestCreateFunctionNode) => {
      return requestCreateFunctionNode(arg);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.functionNodeAll(fileId!)],
      });
    },
  });

  return { createFunctionNode: mutateAsync, ...rest };
};
