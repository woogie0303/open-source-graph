import { FileText, Plus } from "lucide-react";

const sampleData = [
  {
    id: "formatInput",
    name: "formatInput",
    file: "리액트함수.tsx",
    connections: ["handleClick", "renderButton"],
    code: "function formatInput(value) {\n  // 입력값 포맷팅\n  return value.trim();\n}",
  },
  {
    id: "handleClick",
    name: "handleClick",
    file: "리액트함수.tsx",
    connections: ["renderButton"],
    code: "function handleClick() {\n  // 클릭 이벤트 처리\n  console.log('clicked');\n  return formatInput(value);\n}",
  },
  {
    id: "renderButton",
    name: "renderButton",
    file: "리액트함수.tsx",
    connections: [],
    code: "function renderButton() {\n  // 버튼 렌더링\n  return <button onClick={handleClick}>Click me</button>;\n}",
  },
  {
    id: "validateInput",
    name: "validateInput",
    file: "nextjs 함수.tsx",
    connections: ["formatInput"],
    code: "function validateInput(value) {\n  // 입력값 검증\n  return value.length > 0;\n}",
  },
];

// 파일 목록 추출
const fileList = [...new Set(sampleData.map((item) => item.file))];

export default function Navbar() {
  return (
    <div className="border-r bg-background border-slate-200 w-2/5 h-screen">
      <div className="px-4 py-6 border-b border-slate-200 mb-2">
        <div className="flex items-center gap-2">
          <span className="font-medium text-slate-900">Welcome, 동욱</span>
        </div>
      </div>
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-slate-900">Files</h3>
          <button>
            <Plus className="size-5" />
          </button>
        </div>

        <div className="space-y-1">
          {fileList.map((file) => (
            <button className="inline-flex items-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-9 rounded-md px-3 w-full justify-start gap-2 hover:bg-slate-100 text-slate-400 hover:text-slate-800">
              <FileText className="h-4 w-4" />
              {file}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
