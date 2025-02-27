import CodeViewer from "../CodeViewer/CodeViewer";

export default function NodeInform() {
  return (
    <div className="p-4 h-inherit w-[500px] border-l border-slate-200 shadow-lg transform transition-transform duration-300 ease-in-out z-10 ">
      <CodeViewer />
    </div>
  );
}
