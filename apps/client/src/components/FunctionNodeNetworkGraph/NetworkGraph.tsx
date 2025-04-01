/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import initD3Node from "./libs/initD3Node";
import initD3NodeWrapper from "./libs/initD3NodeWrapper";
import initD3Simulation from "./libs/initD3Simulation";
import initD3Zoom from "./libs/initD3Zoom";
import { FunctionNode } from "./types/nodeType";

const NetworkGraph = ({
  data,
  onNodeClick,
  activeNode,
}: {
  data: FunctionNode[];
  activeNode: { id: string; x: number; y: number } | null;
  onNodeClick: (activeNodeId: { id: string; x: number; y: number }) => void;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!svgRef.current) return;

    const observer = new ResizeObserver(() => {
      if (svgRef.current) {
        const { width, height } = svgRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    });

    observer.observe(svgRef.current.parentElement!);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (
      !data ||
      !svgRef.current ||
      dimensions.width === 0 ||
      dimensions.height === 0
    )
      return;

    const { width, height } = dimensions;
    const { nodeWrapper } = initD3NodeWrapper({
      container: d3.select(svgRef.current),
      width,
      height,
    });
    const { node, nodes, link, links } = initD3Node({
      data,
      nodeWrapper,
      onNodeClick: (el) => {
        if (el.x && el.y) onNodeClick({ id: el.id, x: el.x, y: el.y });
      },
    });
    const stopSimulation = initD3Simulation({
      nodes,
      links,
      width,
      height,
      onDragHandle: (simulation) => {
        node.call(
          d3
            .drag<SVGGElement, FunctionNode>()
            .on("start", (event, d) => {
              if (!event.active) simulation.alphaTarget(0.3).restart();
              d.fx = d.x;
              d.fy = d.y;
            })
            .on("drag", (event, d) => {
              d.fx = event.x;
              d.fy = event.y;
            })
            .on("end", (event, d) => {
              if (!event.active) simulation.alphaTarget(0);
              d.fx = null;
              d.fy = null;
            }) as any,
        );
        simulation.on("tick", () => {
          link
            .attr("x1", (d) => (d.source as FunctionNode).x!)
            .attr("y1", (d) => (d.source as FunctionNode).y!)
            .attr("x2", (d) => (d.target as FunctionNode).x!)
            .attr("y2", (d) => (d.target as FunctionNode).y!);
          node.attr("transform", (d) => `translate(${d.x}, ${d.y})`);
        });
      },
    });

    return stopSimulation;
  }, [dimensions, data, onNodeClick]);

  useEffect(() => {
    if (!svgRef.current) return;
    const updatableSvg = svgRef.current;
    const gElement = d3.select(updatableSvg).select("g");

    if (gElement.empty()) return;

    // ✅ 항상 줌 기능 적용
    const zoom = initD3Zoom({ nodeWrapper: gElement });

    d3.select(updatableSvg)
      .call(zoom as any)
      .on("dblclick.zoom", null);

    // ✅ activeNode가 있을 때만 줌 이동 실행
    if (activeNode?.x !== undefined && activeNode?.y !== undefined) {
      const { width, height } = updatableSvg.getBoundingClientRect();
      const scale = 2;
      const newX = width / 2 - scale * activeNode.x;
      const newY = height / 2 - scale * activeNode.y;

      d3.select(updatableSvg)
        .transition()
        .duration(750)
        .call(
          zoom.transform as any,
          d3.zoomIdentity.translate(newX, newY).scale(scale),
        );
    }
    return () => {
      d3.select(updatableSvg)
        .transition()
        .duration(750)
        .call(zoom.transform as any, d3.zoomIdentity.translate(0, 0));
    };
  });

  return <svg ref={svgRef} className="w-full h-inherit"></svg>;
};

export default NetworkGraph;
