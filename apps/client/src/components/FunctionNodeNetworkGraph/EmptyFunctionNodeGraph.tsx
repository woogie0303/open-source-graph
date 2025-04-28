import { File } from "lucide-react";

export default function EmptyFunctionNodeGraph() {
  return (
    <section className="size-full flex flex-col gap-5 items-center justify-center">
      <File className="block size-20 text-primary-100" />

      <p className="text-primary-100 text-2xl">파일을 선택해 주세요</p>
    </section>
  );
}
