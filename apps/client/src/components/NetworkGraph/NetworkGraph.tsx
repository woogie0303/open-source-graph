/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as d3 from "d3";
import { useEffect, useRef } from "react";

// 타입 정의 추가
interface FunctionNode extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  file: string;
  connections: string[];
}

interface LinkDatum extends d3.SimulationLinkDatum<FunctionNode> {
  type: string;
}

const NetworkGraph = ({ data }: { data: FunctionNode[] }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!data || !svgRef.current) return;

    // SVG 요소 초기화
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // 기존 요소 제거

    const width = svgRef.current.getBoundingClientRect().width;
    const height = svgRef.current.getBoundingClientRect().height;

    svg.attr("width", width).attr("height", height);

    // 배경색 설정
    svg
      .append("rect")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("fill", "#f0f0f0");
    const g = svg.append("g");

    // 노드 데이터 준비 (타입 캐스팅)
    const nodes: FunctionNode[] = data;

    // 링크 데이터 준비
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

    // 화살표 마커 정의
    svg
      .append("defs")
      .append("marker")
      .attr("id", "arrowhead")
      .attr("viewBox", "-0 -5 10 10")
      .attr("refX", 25) // 화살표 위치 조정
      .attr("refY", 0)
      .attr("orient", "auto")
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .append("svg:path")
      .attr("d", "M 0,-5 L 10 ,0 L 0,5")
      .attr("fill", "#ff7f0e");

    // 시뮬레이션 생성
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

    // 링크 그리기
    const link = g
      .append("g")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", "#ff7f0e")
      .attr("stroke-width", 2)
      .attr("stroke-opacity", 0.6)
      .attr("marker-end", "url(#arrowhead)");

    // 노드 그룹 생성
    const nodeGroup = g.append("g").selectAll("g").data(nodes).join("g");
    // .on("click", (event, d) => {
    //   onSelectFunction(d);
    // });

    // 드래그 동작 정의
    const dragBehavior = d3
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
      });

    // 드래그 동작 적용 (타입 문제 해결)
    nodeGroup.call(dragBehavior as any);

    // 노드 원 그리기
    nodeGroup
      .append("circle")
      .attr("r", 25)
      .attr("fill", "#4682b4") // 스틸블루 색상
      .attr("stroke", "#333")
      .attr("stroke-width", 1.5);

    // 함수명 텍스트 그리기
    nodeGroup
      .append("text")
      .text((d) => d.name)
      .attr("font-size", 10)
      .attr("fill", "white") // 흰색 텍스트
      .attr("text-anchor", "middle")
      .attr("dy", 4);

    // 시뮬레이션 틱 이벤트 설정
    simulation.on("tick", () => {
      link
        .attr("x1", (d) => (d.source as FunctionNode).x!)
        .attr("y1", (d) => (d.source as FunctionNode).y!)
        .attr("x2", (d) => (d.target as FunctionNode).x!)
        .attr("y2", (d) => (d.target as FunctionNode).y!);

      nodeGroup.attr("transform", (d) => `translate(${d.x}, ${d.y})`);
    });

    // 줌 기능 추가
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4]) // 줌 범위 설정 (0.1x ~ 4x)
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    // 줌 동작 적용
    svg.call(zoom as any).on("dblclick.zoom", null); // 더블 클릭 줌 비활성화

    // 컴포넌트 언마운트 시 시뮬레이션 중지
    return () => {
      simulation.stop();
    };
  }, [data]);

  return <svg ref={svgRef} className="w-full h-screen"></svg>;
};

export default NetworkGraph;
