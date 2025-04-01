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
}: {
  data: FunctionNode[];
  onNodeClick: (activeNodeId: string) => void;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [activeZoomNode, setActiveZoomNode] = useState<FunctionNode>();

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
        onNodeClick(el.id);
        setActiveZoomNode(el);
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
  }, [dimensions, data, onNodeClick, setActiveZoomNode]);

  useEffect(() => {
    const zoom = initD3Zoom({
      nodeWrapper: d3.select(svgRef.current).select("g"),
    });

    if (!svgRef.current || !activeZoomNode) return;
    if (!activeZoomNode.x || !activeZoomNode.y) return;
    const { width, height } = svgRef.current.getBoundingClientRect();

    const scale = 2;
    const newX = width / 2 - scale * activeZoomNode.x;
    const newY = height / 2 - scale * activeZoomNode.y;

    d3.select(svgRef.current)
      .transition()
      .duration(750)
      .call(
        zoom.transform as any,
        d3.zoomIdentity.translate(newX, newY).scale(scale),
      );
    d3.select(svgRef.current)
      .call(zoom as any)
      .on("dblclick.zoom", null);
  }, [activeZoomNode]);

  return <svg ref={svgRef} className="w-full h-inherit"></svg>;
};

export default NetworkGraph;
