import { requestGetGithubCode } from "@/apis/request/functionNode";
import { Dialog } from "@/components/common/Dialog";
import { useRequestCreateFunctionNode } from "@/hooks/queries/functionNode/useRequestCreateFunctionNode";
import { useRequestGetFunctionNodes } from "@/hooks/queries/functionNode/useRequestGetFunctionNodes";
import { X } from "lucide-react";
import { ComponentRef, FormEventHandler, useMemo, useRef } from "react";
import { useParams } from "react-router";
import DualSelect from "../common/MultiSelect";
import { parseCodeFromStartLine } from "./utils/parseCodeFromStartLine";

export default function UpdateFunctionNodeDialog({
  open,
  onOpenChange,
  nodeId,
}: {
  nodeId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { createFunctionNode } = useRequestCreateFunctionNode();
  const { functionNodes } = useRequestGetFunctionNodes();
  const param = useParams();
  const functionNodeUrlRef = useRef<HTMLInputElement>(null);
  const functionNodeTitleRef = useRef<HTMLInputElement>(null);
  const closeButtonRef = useRef<ComponentRef<"button">>(null);
  const connectionRef = useRef<string[]>([]);
  const selectedValue = useMemo(() => {
    const updateFunctionNode = functionNodes?.find((el) => el.id === nodeId);

    if (updateFunctionNode) {
      const selectedValue = updateFunctionNode.connection.map(
        (selectNodeId) => {
          const functionNode = functionNodes?.find(
            (el) => el.id === selectNodeId,
          );
          return {
            id: functionNode!.id,
            name: functionNode!.name,
          };
        },
      );

      return selectedValue;
    }
  }, [functionNodes, nodeId]);
  const nodeName = useMemo(() => {
    return functionNodes?.find((el) => el.id === nodeId)?.name;
  }, [functionNodes, nodeId]);

  const createFunctionNodeSubmitHandler: FormEventHandler<
    HTMLFormElement
  > = async (e) => {
    e.preventDefault();
    if (
      !functionNodeUrlRef.current?.value ||
      !functionNodeTitleRef.current?.value
    )
      return;

    const res = await requestGetGithubCode(functionNodeUrlRef.current?.value);
    if (res) {
      const codeText = parseCodeFromStartLine({
        code: res.codeText,
        startLine: res.startLine,
      });

      createFunctionNode({
        fileId: param.fileId as string,
        codeText,
        name: functionNodeTitleRef.current.value,
        connection: connectionRef.current,
      });

      closeButtonRef.current?.click();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Content width={600}>
        <div className="size-full">
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-lg font-medium text-slate-900">
              함수 노드 변경
            </h3>
            <Dialog.Close
              ref={closeButtonRef}
              className="text-slate-400 hover:text-slate-500 transition-colors"
            >
              <X className="h-5 w-5" />
            </Dialog.Close>
          </div>
          <div className="p-6">
            <form
              className="space-y-4"
              onSubmit={createFunctionNodeSubmitHandler}
            >
              <div className="space-y-2">
                <label
                  htmlFor="function-title"
                  className="block text-sm font-medium text-slate-700"
                >
                  함수 제목
                </label>
                <input
                  id="function-title"
                  ref={functionNodeTitleRef}
                  type="text"
                  defaultValue={nodeName}
                  placeholder="함수 이름 입력"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                        focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="function-title"
                  className="block text-sm font-medium text-slate-700"
                >
                  상위 호출자 함수 목록
                </label>
                {functionNodes && (
                  <DualSelect
                    options={functionNodes.map((el) => ({
                      id: el.id,
                      name: el.name,
                    }))}
                    onMultiSelectValueChange={(value) => {
                      connectionRef.current = value.map((el) => el.id);
                    }}
                    selectedValue={selectedValue}
                  />
                )}
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                함수 변경
              </button>
            </form>
          </div>
        </div>
      </Dialog.Content>
    </Dialog>
  );
}
