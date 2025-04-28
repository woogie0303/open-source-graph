import { FileTree } from "@/components/FileTree";
import EmptyFunctionNodeGraph from "@/components/FunctionNodeNetworkGraph/EmptyFunctionNodeGraph";
import { Outlet, useParams } from "react-router";

export default function FunctionNodePage() {
  const params = useParams();
  return (
    <div className="flex h-[calc(100vh-64px)]">
      <FileTree />
      {!params.fileId && <EmptyFunctionNodeGraph />}
      <Outlet />
    </div>
  );
}
