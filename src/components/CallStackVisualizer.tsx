import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface CallStackVisualizerProps {
  callStack: string[];
}

const CallStackVisualizer: React.FC<CallStackVisualizerProps> = ({ callStack }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current);
      svg.selectAll('*').remove();

      const width = 400;
      const height = 300;
      const barHeight = 30;

      svg.attr('width', width).attr('height', height);

      const bars = svg.selectAll('rect').data(callStack);

      bars.enter()
        .append('rect')
        .attr('x', 0)
        .attr('y', (_, i) => i * barHeight)
        .attr('width', width)
        .attr('height', barHeight - 2)
        .attr('fill', 'steelblue');

      bars.enter()
        .append('text')
        .attr('x', 10)
        .attr('y', (_, i) => i * barHeight + barHeight / 2)
        .attr('dy', '.35em')
        .text((d) => d);
    }
  }, [callStack]);

  return <svg ref={svgRef}></svg>;
};

export default CallStackVisualizer;
