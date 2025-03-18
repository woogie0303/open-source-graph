import { javascript } from "@codemirror/lang-javascript";
import { tags as t } from "@lezer/highlight";
import { createTheme } from "@uiw/codemirror-themes";
import CodeMirror from "@uiw/react-codemirror";
import { useEffect, useRef, useState } from "react";
import { getFullCodeBlock } from "./utils";

const customTheme = createTheme({
  theme: "light",
  settings: {
    background: "#F8FAFC",
    foreground: "#334155",
    caret: "#475569",
    selection: "#E2E8F0",
    selectionMatch: "#E2E8F0",
    lineHighlight: "#F1F5F9",
  },
  styles: [
    { tag: t.comment, color: "#64748B" }, // 더 진한 회색
    { tag: t.variableName, color: "#0891B2" }, // 청록색
    { tag: t.string, color: "#059669" }, // 진한 녹색
    { tag: t.number, color: "#D97706" }, // 황금색
    {
      tag: [t.keyword, t.typeName, t.typeOperator, t.modifier],
      color: "#8B5CF6",
    }, // 선명한 보라색
    {
      tag: [t.function(t.variableName), t.function(t.propertyName)],
      color: "#2563EB",
    }, // 선명한 파란색
    { tag: t.definition(t.propertyName), color: "#0D9488" }, // 청록색 계열
    { tag: t.propertyName, color: "#0891B2" }, // 청록색
    { tag: t.operator, color: "#9333EA" }, // 보라색 계열
    { tag: [t.className, t.tagName], color: "#2563EB" }, // 파란색
    { tag: t.bracket, color: "#475569" }, // 중간 톤의 회색
    { tag: t.punctuation, color: "#475569" }, // 중간 톤의 회색
    { tag: [t.attributeName, t.attributeValue], color: "#059669" }, // 녹색 계열
  ],
});

export default function CodeViewer() {
  const [code, setCode] = useState("");
  const targetLine = 144;
  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const rawUrl =
      "https://raw.githubusercontent.com/facebook/react/main/packages/react-reconciler/src/ReactFiberCommitEffects.js";

    fetch(rawUrl)
      .then((response) => response.text())
      .then((text) => {
        setCode(getFullCodeBlock({ code: text, startLine: targetLine - 1 }));
      });
  }, []);
  return (
    <>
      <div
        ref={divRef}
        className=" overflow-auto rounded-lg border border-slate-200"
      >
        <CodeMirror
          value={code}
          extensions={[javascript({ jsx: true })]} // JavaScript + JSX 지원으로 변경
          theme={customTheme}
          readOnly
          basicSetup={{
            lineNumbers: true,
            highlightActiveLineGutter: true,
            highlightActiveLine: true,
            foldGutter: true,
          }}
        />
      </div>
      {/* <button
        onClick={() => {
          if (divRef.current) {
            const totalHeight = divRef.current.scrollHeight;
            const lineHeight = totalHeight / 157;
            divRef.current.scrollTo({
              top: lineHeight * 38,
              behavior: "smooth",
            });
          }
        }}
      >
        scroll to
      </button> */}
    </>
  );
}
