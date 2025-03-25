import { FileTree } from "@/components/FileTree";
import { Outlet } from "react-router";

export default function FunctionNodePage() {
  return (
    <div className="flex h-[calc(100vh-64px)]">
      <FileTree />
      <Outlet />
    </div>
  );
}
