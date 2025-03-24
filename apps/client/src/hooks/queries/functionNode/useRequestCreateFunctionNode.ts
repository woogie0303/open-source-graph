import {
  requestCreateFunctionNode,
  RequestCreateFunctionNode,
} from "@/apis/request/functionNode";
import { useMutation } from "@tanstack/react-query";

export const useRequestCreateFunctionNode = () => {
  const { mutate, ...rest } = useMutation({
    mutationFn: (arg: RequestCreateFunctionNode) => {
      return requestCreateFunctionNode(arg);
    },
  });

  return { createFunctionNode: mutate, ...rest };
};
