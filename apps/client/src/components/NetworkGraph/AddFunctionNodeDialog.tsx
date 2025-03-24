import { Dialog } from "@/components/common/Dialog";
import { GitFork, X } from "lucide-react";

export default function AddFunctionNodeDialog() {
  return (
    <Dialog>
      <Dialog.Trigger>
        <button
          type="submit"
          className="inline-flex bg-slate-200 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-slate-400 h-10 px-4 py-2 gap-2"
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
            <button className="text-slate-400 hover:text-slate-500 transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="p-6">
            <form className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="github-url"
                  className="block text-sm font-medium text-slate-700"
                >
                  GitHub URL
                </label>
                <input
                  id="github-url"
                  type="text"
                  placeholder="예) https://github.com/user/repo/blob/main/src/components/Button.tsx/#L10"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                        focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
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
                  type="text"
                  placeholder="함수 이름 입력"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                        focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <p className="text-xs text-slate-500">
                  코드에서 함수 이름을 자동으로 사용하려면 비워두세요
                </p>
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
