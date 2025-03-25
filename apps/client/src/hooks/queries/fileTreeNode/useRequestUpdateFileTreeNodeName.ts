import {
  RequestUpdateFileTreeNodeName,
  requestUpdateFileTreeNodeName,
} from "@/apis/request/fileTree";
import { QUERY_KEYS } from "@/constant/queryKey";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useRequestUpdateFileTreeNodeName = () => {
  const queryClient = useQueryClient();
  const { mutate, ...rest } = useMutation({
    mutationFn: ({ id, newName }: RequestUpdateFileTreeNodeName) =>
      requestUpdateFileTreeNodeName({ id, newName }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.fileTree] });
    },
  });

  return { updateFileTreeNodeName: mutate, ...rest };
};
