/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";

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

const NetworkGraph = ({
  data,
  onNodeClick,
}: {
  data: FunctionNode[];
  onNodeClick: () => void;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const zoomRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);

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
    if (!data || !svgRef.current) return;

    const { width, height } = dimensions;
    if (width === 0 || height === 0) return;

    // ✅ SVG 초기화
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    svg.attr("width", width).attr("height", height);

    svg
      .append("rect")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("fill", "#ffffff");

    const g = svg.append("g");

    const nodes: FunctionNode[] = data;
    const links: LinkDatum[] = [];
    nodes.forEach((node) => {
      node.connections.forEach((targetId) => {
        links.push({
          source: node.id,
          target: targetId,
          type: "calls",
        });
      });
    });

    svg
      .append("defs")
      .append("marker")
      .attr("id", "arrowhead")
      .attr("viewBox", "-0 -5 10 10")
      .attr("refX", 28)
      .attr("refY", 0)
      .attr("orient", "auto")
      .attr("markerWidth", 16)
      .attr("markerHeight", 16)
      .append("svg:path")
      .attr("d", "M -2,-4 L 4,0 L -2,4")
      .attr("fill", "#94A3B8");

    const simulation = d3
      .forceSimulation<FunctionNode>(nodes)
      .force(
        "link",
        d3
          .forceLink<FunctionNode, LinkDatum>(links)
          .id((d) => d.id)
          .distance(150),
      )
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = g
      .append("g")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", "#E2E8F0")
      .attr("stroke-width", 1.5)
      .attr("stroke-opacity", 1)
      .attr("marker-end", "url(#arrowhead)");

    // ✅ 노드 그룹 추가
    const nodeGroup = g
      .append("g")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .on("click", (event, d) => {
        onNodeClick();
        event.stopPropagation();
        clicked(d);
      });

    nodeGroup.call(
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

    // ✅ 노드 디자인
    nodeGroup
      .append("circle")
      .attr("r", 28)
      .attr("fill", "#F8FAFC")
      .attr("stroke", "#E2E8F0")
      .attr("stroke-width", 1.5);
    nodeGroup
      .append("text")
      .text((d) => d.name)
      .attr("font-size", 12)
      .attr("fill", "#64748B")
      .attr("text-anchor", "middle")
      .attr("dy", 4);

    // ✅ 시뮬레이션 업데이트
    simulation.on("tick", () => {
      link
        .attr("x1", (d) => (d.source as FunctionNode).x!)
        .attr("y1", (d) => (d.source as FunctionNode).y!)
        .attr("x2", (d) => (d.target as FunctionNode).x!)
        .attr("y2", (d) => (d.target as FunctionNode).y!);
      nodeGroup.attr("transform", (d) => `translate(${d.x}, ${d.y})`);
    });

    // ✅ 줌 설정
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 4])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    zoomRef.current = zoom;
    svg.call(zoom as any).on("dblclick.zoom", null);

    function clicked(d: FunctionNode) {
      if (!d.x || !d.y) return;
      const scale = 2;
      const newX = width / 2 - scale * d.x;
      const newY = height / 2 - scale * d.y;

      setTimeout(() => {
        svg
          .transition()
          .duration(750)
          .call(
            zoomRef.current!.transform as any,
            d3.zoomIdentity.translate(newX, newY).scale(scale),
          );
      }, 100); // ✅ 100ms 딜레이 추가
    }

    return () => {
      simulation.stop();
    };
  }, [dimensions, data, onNodeClick]);

  return <svg ref={svgRef} className="w-full h-screen"></svg>;
};

export default NetworkGraph;
