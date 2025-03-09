// 타입 정의
interface FunctionNode extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  file: string;
  connections: string[];
}

interface LinkDatum extends d3.SimulationLinkDatum<FunctionNode> {
  type: string;
}

export type { FunctionNode, LinkDatum };
