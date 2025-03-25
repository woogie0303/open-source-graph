import { requestGetFileTreeNode } from "@/apis/request/fileTree";
import { QUERY_KEYS } from "@/constant/queryKey";
import { useQuery } from "@tanstack/react-query";
import sortFoldersAndFiles from "./utils/sortFolderAndFiles";

export const useRequestGetFileTreeNode = () => {
  const { data, ...rest } = useQuery({
    queryKey: [QUERY_KEYS.fileTree],
    queryFn: () => requestGetFileTreeNode(),
    select: (data) => {
      sortFoldersAndFiles(data);

      return data;
    },
  });

  return { fileTreeNode: data, ...rest };
};
