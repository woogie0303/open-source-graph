import { requestGetFunctionNodes } from "@/apis/request/functionNode";
import { QUERY_KEYS } from "@/constant/queryKey";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

export const useRequestGetFunctionNodes = () => {
  const { fileId } = useParams();
  const { data, ...rest } = useQuery({
    queryKey: [QUERY_KEYS.functionNodeAll],
    queryFn: () => requestGetFunctionNodes({ fileId: fileId as string }),
  });

  return {
    functionNodes: data,
    ...rest,
  };
};
