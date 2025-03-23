import { useState } from "react";
import { NetworkGraph } from "./components/NetworkGraph";
import { NodeInform } from "./components/NodeInform";

import { FileTree } from "./components/FileTree";
import { Navbar } from "./components/Navbar";
import "./index.css";
const sampleData = {
  files: [
    {
      name: "src",
      children: [
        {
          name: "components",
          children: [{ name: "Button.tsx" }, { name: "Input.tsx" }],
        },
        { name: "utils", children: [{ name: "helpers.ts" }] },
        { name: "App.tsx" },
      ],
    },
    { name: "package.json" },
  ],
  functions: [
    {
      id: "1",
      name: "renderButton",
      file: "src/components/Button.tsx",
      connections: ["2"],
    },
    {
      id: "2",
      name: "handleClick",
      file: "src/components/Button.tsx",
      connections: ["3"],
    },
    {
      id: "3",
      name: "formatInput",
      file: "src/components/Input.tsx",
      connections: [],
    },
    {
      id: "4",
      name: "validateInput",
      file: "src/utils/helpers.ts",
      connections: ["3"],
    },
  ],
};

function App() {
  const [activeNode, setActiveNode] = useState(false);
  return (
    <div className=" h-full">
      <Navbar />
      <div className="flex h-[calc(100vh-64px)]">
        <FileTree />
        <NetworkGraph
          data={sampleData.functions}
          onNodeClick={() => {
            setActiveNode(true);
          }}
        />
        {activeNode && <NodeInform />}
      </div>
    </div>
  );
}

export default App;
