import { singleRequest } from "@/apis/apiCall";
import { requestPatchEditorBlock } from "@/apis/request/functionNode";
import { QUERY_KEYS } from "@/constant/queryKey";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";

export const useRequestPatchEditorBlock = () => {
  const queryClient = useQueryClient();
  const { fileId } = useParams();
  const { mutate, ...rest } = useMutation({
    mutationFn: singleRequest(requestPatchEditorBlock),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.functionNodeAll(fileId!)],
      });
    },
  });

  return {
    patchEditorBlock: mutate,
    ...rest,
  };
};
