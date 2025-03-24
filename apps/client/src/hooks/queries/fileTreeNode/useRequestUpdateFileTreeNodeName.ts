import {
  RequestUpdateFileTreeNodeName,
  requestUpdateFileTreeNodeName,
} from "@/apis/request/fileTree";
import { useMutation } from "@tanstack/react-query";

export const useRequestUpdateFileTreeNodeName = () => {
  const { mutate, ...rest } = useMutation({
    mutationFn: ({ id, newName }: RequestUpdateFileTreeNodeName) =>
      requestUpdateFileTreeNodeName({ id, newName }),
  });

  return { updateFileTreeNodeName: mutate, ...rest };
};
