import { Code, Notebook } from "lucide-react";
import CodeViewer from "../CodeViewer/CodeViewer";
import { Tabs } from "../common/Tabs";
import TabsContent from "../common/Tabs/TabsContent";
import TabsTrigger from "../common/Tabs/TabsTrigger";

export default function NodeInform() {
  return (
    <div className="p-4 overflow-y-scroll h-inherit w-[1000px] h-screen border-l border-slate-200 shadow-lg transform transition-transform duration-300 ease-in-out z-10 ">
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
          <div className="">memo</div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
