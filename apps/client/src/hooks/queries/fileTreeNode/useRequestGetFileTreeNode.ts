import { requestGetFileTreeNode } from "@/apis/request/fileTree";
import { QUERY_KEYS } from "@/constant/queryKey";
import { useQuery } from "@tanstack/react-query";

export const useRequestGetFileTreeNode = () => {
  const { data, ...rest } = useQuery({
    queryKey: [QUERY_KEYS.fileTree],
    queryFn: () => requestGetFileTreeNode(),
  });

  return { fileTreeNode: data, ...rest };
};
