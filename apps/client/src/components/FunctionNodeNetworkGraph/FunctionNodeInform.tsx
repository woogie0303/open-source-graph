import { Code, Notebook, X } from "lucide-react";
import CodeViewer from "../CodeViewer/FunctionNodeCodeViewer";
import { Tabs } from "../common/Tabs";
import TabsContent from "../common/Tabs/TabsContent";
import TabsTrigger from "../common/Tabs/TabsTrigger";
import { TextEditorBox } from "../TextEditorBox";

export default function FunctionNodeInform() {
  return (
    <div className="px-4 py-8 overflow-y-scroll basis-5/6 h-inherit border-l border-slate-200 shadow-lg transform transition-transform duration-300 ease-in-out z-10">
      <div className="text-xl font-medium text-slate-900 mb-8 flex justify-between">
        RenderPhase{" "}
        <button onClick={() => {}}>
          <X />
        </button>
      </div>
      <Tabs defaultValue="code">
        {/* TODO: TabList 추가 */}
        <div className="items-center  justify-center rounded-md bg-gray-100 p-1 text-gray-400 grid w-full grid-cols-2 mb-4">
          <TabsTrigger
            className="flex items-center justify-center gap-2 text-sm font-medium"
            value="code"
          >
            <Code className="size-4 gap-2" /> Code
          </TabsTrigger>
          <TabsTrigger
            className="flex items-center justify-center gap-2 text-sm font-medium"
            value="memo"
          >
            <Notebook className="size-4 gap-2" /> Memo
          </TabsTrigger>
        </div>
        <TabsContent value="code">
          <CodeViewer />
        </TabsContent>
        <TabsContent value="memo">
          <TextEditorBox />
        </TabsContent>
      </Tabs>
    </div>
  );
}
