import { FileTree } from "../FileTree";

export default function Navbar() {
  return (
    <div className="border-r bg-background border-slate-200 w-2/5 h-screen flex flex-col">
      <div className="px-4 py-6 border-b border-slate-200 mb-2">
        <div className="flex items-center gap-2">
          <span className="font-medium text-slate-900">Welcome, 동욱</span>
        </div>
      </div>
      <div className="p-4 space-y-4 h-full">
        <FileTree />

        {/* <div className="space-y-1">
          {fileList.map((file) => (
            <button className="inline-flex items-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-9 rounded-md px-3 w-full justify-start gap-2 hover:bg-slate-100 text-slate-400 hover:text-slate-800">
              <FileText className="h-4 w-4" />
              {file}
            </button>
          ))}
        </div> */}
      </div>
    </div>
  );
}
