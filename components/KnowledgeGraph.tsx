import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { GraphData, Node, Link } from '../types';

interface KnowledgeGraphProps {
  data: GraphData;
}

const KnowledgeGraph: React.FC<KnowledgeGraphProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    // Clear previous render
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("viewBox", [0, 0, width, height])
      .style("background-color", "#050505");

    const simulation = d3.forceSimulation<Node>(data.nodes)
      .force("link", d3.forceLink<Node, Link>(data.links).id(d => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide().radius(d => (d.radius || 5) + 10));

    const link = svg.append("g")
      .attr("stroke", "#333")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(data.links)
      .join("line")
      .attr("stroke-width", d => Math.sqrt(d.value));

    const node = svg.append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(data.nodes)
      .join("circle")
      .attr("r", d => d.radius || 5)
      .attr("fill", d => {
          if (d.group === 1) return "#2dd4bf"; // Core
          if (d.group === 2) return "#c084fc"; // Agents
          if (d.group === 3) return "#60a5fa"; // Work
          return "#94a3b8"; // Notes
      })
      .call(drag(simulation) as any);

    const label = svg.append("g")
        .selectAll("text")
        .data(data.nodes)
        .join("text")
        .text(d => d.label)
        .attr("font-size", "10px")
        .attr("fill", "#94a3b8")
        .attr("dx", 12)
        .attr("dy", 4)
        .style("font-family", "ui-monospace, monospace");

    simulation.on("tick", () => {
      link
        .attr("x1", d => (d.source as any).x)
        .attr("y1", d => (d.source as any).y)
        .attr("x2", d => (d.target as any).x)
        .attr("y2", d => (d.target as any).y);

      node
        .attr("cx", d => d.x!)
        .attr("cy", d => d.y!);
    
      label
        .attr("x", d => d.x!)
        .attr("y", d => d.y!);
    });

    function drag(simulation: d3.Simulation<Node, undefined>) {
      function dragstarted(event: any) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }

      function dragged(event: any) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }

      function dragended(event: any) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }

      return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    }

    return () => {
      simulation.stop();
    };
  }, [data]);

  return (
    <svg ref={svgRef} className="w-full h-full rounded-xl border border-white/10 shadow-inner bg-void" />
  );
};

export default KnowledgeGraph;