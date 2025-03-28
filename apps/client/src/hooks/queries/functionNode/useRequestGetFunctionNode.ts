import { requestGetFunctionNode } from "@/apis/request/functionNode";
import { QUERY_KEYS } from "@/constant/queryKey";
import { useQuery } from "@tanstack/react-query";

export const useRequestGetFunctionNode = (nodeId: string) => {
  const { data, ...rest } = useQuery({
    queryKey: [QUERY_KEYS.functionNode(nodeId)],
    queryFn: () => requestGetFunctionNode({ nodeId }),
  });

  return { functionNode: data, ...rest };
};
