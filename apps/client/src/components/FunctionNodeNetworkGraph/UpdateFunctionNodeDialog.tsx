import { Dialog } from "@/components/common/Dialog";
import { useRequestGetFunctionNodes } from "@/hooks/queries/functionNode/useRequestGetFunctionNodes";
import { useRequestUpdateFunctionNode } from "@/hooks/queries/functionNode/useRequestUpdateFunctionNode";
import { useUpdatableRef } from "@/hooks/useUpdatableRef.ts";
import { X } from "lucide-react";
import { ComponentRef, FormEventHandler, useMemo, useRef } from "react";
import DualSelect from "../common/MultiSelect";

export default function UpdateFunctionNodeDialog({
  open,
  onOpenChange,
  nodeId,
  onClose,
}: {
  nodeId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
}) {
  const { updateFunctionNode } = useRequestUpdateFunctionNode();
  const { functionNodes } = useRequestGetFunctionNodes();
  const functionNodeTitleRef = useRef<HTMLInputElement>(null);
  const closeButtonRef = useRef<ComponentRef<"button">>(null);
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
  const connectionRef = useUpdatableRef(selectedValue?.map((el) => el.id));

  const updateFunctionNodeSubmitHandler: FormEventHandler<
    HTMLFormElement
  > = async (e) => {
    e.preventDefault();
    // TODO: 같은값 일때는 호출안하도록 만들어버리기
    updateFunctionNode({
      id: nodeId,
      name: functionNodeTitleRef.current?.value,
      connection: connectionRef.current,
    });
    onClose();
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
              onSubmit={updateFunctionNodeSubmitHandler}
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
