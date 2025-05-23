import { requestGetGithubCode } from "@/apis/request/functionNode";
import { Dialog } from "@/components/common/Dialog";
import { useRequestCreateFunctionNode } from "@/hooks/queries/functionNode/useRequestCreateFunctionNode";
import { useRequestGetFunctionNodes } from "@/hooks/queries/functionNode/useRequestGetFunctionNodes";
import { Close, GitFork, TriangleAlert } from "icons";
import { ComponentRef, FormEventHandler, useRef } from "react";
import { useParams } from "react-router";
import { MultiSelect } from "../common/MultiSelect";
import { parseCodeFromStartLine } from "./utils/parseCodeFromStartLine";

export default function AddFunctionNodeDialog({
  clearActiveStateNode,
}: {
  clearActiveStateNode: () => void;
}) {
  const { createFunctionNode } = useRequestCreateFunctionNode();
  const { functionNodes } = useRequestGetFunctionNodes();
  const param = useParams();
  const functionNodeUrlRef = useRef<HTMLInputElement>(null);
  const functionNodeTitleRef = useRef<HTMLInputElement>(null);
  const closeButtonRef = useRef<ComponentRef<"button">>(null);
  const connectionRef = useRef<string[]>([]);

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

      await createFunctionNode({
        fileId: param.fileId as string,
        codeText,
        name: functionNodeTitleRef.current.value,
        connection: connectionRef.current,
      });
      clearActiveStateNode();
      connectionRef.current = [];
      closeButtonRef.current?.click();
    }
  };
  return (
    <Dialog>
      <Dialog.Trigger>
        <button
          type="submit"
          className=" absolute bottom-3 left-3 hover:bg-primary-500 hover:text-white inline-flex bg-slate-200 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-slate-400 h-10 px-4 py-2 gap-2"
        >
          <GitFork />
          함수 추가
        </button>
      </Dialog.Trigger>
      <Dialog.Content width={600}>
        <div className="">
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-lg font-medium text-slate-900">
              새 함수 노드 추가
            </h3>
            <Dialog.Close
              ref={closeButtonRef}
              className="text-slate-400 hover:text-slate-500 transition-colors"
            >
              <Close className="h-5 w-5" />
            </Dialog.Close>
          </div>
          <div className="p-6">
            <form
              className="space-y-4"
              onSubmit={createFunctionNodeSubmitHandler}
            >
              <div className="space-y-2">
                <label
                  htmlFor="github-url"
                  className="block text-sm font-medium text-slate-700"
                >
                  GitHub URL
                </label>
                <input
                  id="github-url"
                  ref={functionNodeUrlRef}
                  type="text"
                  placeholder="예) https://github.com/user/repo/blob/main/src/components/Button.tsx/#L10"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                        focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
                <p className="text-xs text-slate-500 flex items-center gap-1">
                  <TriangleAlert className="text-red-600 size-[18px]" />
                  <span>함수 URL만 입력해주세요</span>
                </p>
              </div>
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
                  <MultiSelect
                    options={functionNodes.map((el) => ({
                      id: el.id,
                      name: el.name,
                    }))}
                    selectedValue={functionNodes.filter((node) =>
                      connectionRef.current.includes(node.id),
                    )}
                    onValueChange={(value) => {
                      connectionRef.current = value.map((el) => el.id);
                    }}
                  />
                )}
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                함수 추가
              </button>
            </form>
          </div>
        </div>
      </Dialog.Content>
    </Dialog>
  );
}
