import EditorJS, {
  OutputBlockData,
  OutputData,
  ToolConstructable,
} from "@editorjs/editorjs";
import Header from "@editorjs/header";
import EditorjsList from "@editorjs/list";
import { useEffect, useRef } from "react";

const EDITOR_JS_TOOLS = {
  header: {
    class: Header as unknown as ToolConstructable,
    config: {
      levels: [2, 3, 4],
    },
  },

  list: {
    class: EditorjsList as unknown as ToolConstructable,
    inlineToolbar: true,
    config: {
      defaultStyle: "unordered",
    },
  },
};

// const INITIAL_DATA: OutputData = {
//   time: new Date().getTime(),
//   blocks: [
//     {
//       type: "header",
//       data: {
//         text: "",
//         level: 3,
//       },
//     },
//   ],
// };

export default function TextEditorBox({
  initialValue,
  onEditorBoxChange,
}: {
  initialValue: OutputBlockData[];
  onEditorBoxChange: (editorBox: OutputBlockData[]) => void;
}) {
  const editorRef = useRef<EditorJS>(null);
  const outputDataRef = useRef<OutputData>({
    time: new Date().getTime(),
    blocks: initialValue,
  });
  const editorBlock = "editorjs-container";

  useEffect(() => {
    if (!editorRef.current && outputDataRef.current !== null) {
      const editor = new EditorJS({
        holder: editorBlock,
        data: outputDataRef.current,
        tools: EDITOR_JS_TOOLS,
        async onChange(api) {
          const data = await api.saver.save();

          onEditorBoxChange(data.blocks);
          outputDataRef.current = data;
        },
      });
      editorRef.current = editor;
    }

    return () => {
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy();
      }
    };
  }, []);

  return <div id={editorBlock} />;
}
