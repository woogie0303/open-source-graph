import { requestGetFunctionNodes } from "@/apis/request/functionNode";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

export const useRequestGetFunctionNodes = () => {
  const { fileId } = useParams();
  console.log(fileId);
  const { data, ...rest } = useQuery({
    queryKey: ["functionNodes-all"],
    queryFn: () => requestGetFunctionNodes({ fileId: fileId as string }),
  });

  return {
    functionNodes: data,
    ...rest,
  };
};
