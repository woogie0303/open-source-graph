import { singleRequest } from "@/apis/apiCall";
import { requestPatchEditorBlock } from "@/apis/request/functionNode";
import { useMutation } from "@tanstack/react-query";

export const useRequestPatchEditorBlock = () => {
  const { mutate, ...rest } = useMutation({
    mutationFn: singleRequest(requestPatchEditorBlock),
  });

  return {
    patchEditorBlock: mutate,
    ...rest,
  };
};
