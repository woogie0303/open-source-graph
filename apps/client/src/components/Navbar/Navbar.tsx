export default function Navbar() {
  return (
    <div className="hidden lg:flex h-16 bg-white border-b border-slate-200 items-center justify-between px-6 z-30">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold text-slate-900">함수 지도</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 ml-4">
          <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
            JD
          </div>
          <span className="text-sm font-medium text-slate-700">John Doe</span>
        </div>
      </div>
    </div>
  );
}
