import { GitFork } from "lucide-react";

export default function AddFileNodeButton() {
  return (
    <div className="">
      <button
        type="submit"
        className="inline-flex bg-slate-200 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-slate-400 hover:bg-primary/90 h-10 px-4 py-2 gap-2"
      >
        <GitFork />
        함수 추가
      </button>
    </div>
  );
}
