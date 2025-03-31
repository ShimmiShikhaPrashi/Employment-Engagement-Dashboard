import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';

const GroupedColumnChart = () => {
  const [dimensions, setDimensions] = useState({
    width: Math.max(window.innerWidth * 0.8, 400),
    height: Math.max(window.innerHeight * 0.5, 300),
  });

  const [visibleKeys, setVisibleKeys] = useState(['y0', 'y1', 'y2']);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: Math.max(window.innerWidth * 0.8, 400),
        height: Math.max(window.innerHeight * 0.5, 100),
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const { width, height } = dimensions;
    const margin = { top: 40, right: 150, bottom: 50, left: 50 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    d3.select('#multi-chart').selectAll('*').remove();

    const svg = d3
      .select('#multi-chart')
      .append('svg')
      .attr('width', width)
      .attr('height', height+40)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const generateNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
    const getDatum = () =>
      Array.from({ length: 12 }, (_, i) => ({
        x: i,
        y0: generateNumber(0, 60),
        y1: generateNumber(0, 50),
        y2: generateNumber(0, 30),
      }));

    const data = getDatum();
    const colorScale = d3.scaleOrdinal().range(['#A389D4', '#04a9f5', '#1de9b6']);
    const groupKeys = ['y0', 'y1', 'y2'];

    const xScale = d3.scaleBand().domain(data.map(d => d.x)).range([0, chartWidth]).padding(0.2);
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => Math.max(d.y0, d.y1, d.y2))])
      .nice()
      .range([chartHeight, 0]);

    const tooltip = d3.select('body').append('div')
      .style('position', 'absolute')
      .style('background', '#fff')
      .style('border', '1px solid #ddd')
      .style('padding', '5px')
      .style('border-radius', '5px')
      .style('box-shadow', '0px 0px 5px rgba(0,0,0,0.2)')
      .style('opacity', 0)
      .style('pointer-events', 'none');

    data.forEach(d => {
      const activeKeys = groupKeys.filter(key => visibleKeys.includes(key)); // Filter visible series
      const groupWidth = xScale.bandwidth() / activeKeys.length;

      activeKeys.forEach((key, index) => {
        svg.append('rect')
          .attr('x', xScale(d.x) + index * groupWidth)
          .attr('y', yScale(d[key]))
          .attr('height', chartHeight - yScale(d[key]))
          .attr('width', groupWidth)
          .attr('fill', colorScale(key))
          .on('mouseover', (event) => {
            tooltip.style('opacity', 1)
              .html(`
                <div style="display: flex; align-items: center;">
                  <div style="width: 12px; height: 12px; background: ${colorScale(key)}; margin-right: 5px;"></div>
                  <strong>Value:</strong> ${d[key]}
                </div>
              `)
              .style('left', `${event.pageX + 10}px`)
              .style('top', `${event.pageY - 20}px`);
          })
          .on('mousemove', (event) => {
            tooltip.style('left', `${event.pageX + 10}px`).style('top', `${event.pageY - 20}px`);
          })
          .on('mouseout', () => {
            tooltip.style('opacity', 0);
          });
      });
    });
    svg.append('g')
    .attr('class', 'grid')
    .call(d3.axisLeft(yScale)
      .tickSize(-chartWidth) // Extend ticks across chart width
      .tickFormat('') // Hide tick labels
    )
    .selectAll('line')
    .style('stroke', '#ddd') // Light grey for better visibility
    .style('stroke-opacity', 0.7)
    .style('shape-rendering', 'crispEdges');
  
    svg.append('g').attr('transform', `translate(0,${chartHeight})`).call(d3.axisBottom(xScale).tickFormat(d => `Hospital ${d + 1}`));
    svg.append('g').call(d3.axisLeft(yScale));

    // Calculate total values for legend
    const totals = groupKeys.reduce((acc, key) => {
      acc[key] = visibleKeys.includes(key) ? data.reduce((sum, d) => sum + d[key], 0) : 0;
      return acc;
    }, {});

    const legend = svg.append('g').attr('transform', `translate(${chartWidth / 2 - 60}, ${chartHeight + 40})`);

groupKeys.forEach((key, index) => {
  const isActive = visibleKeys.includes(key);

  const legendRow = legend.append('g')
    .attr('transform', `translate(${index * 100}, 0)`) // Horizontal spacing
    .style('cursor', 'pointer')
    .on('click', () => {
      setVisibleKeys(prevKeys =>
        prevKeys.includes(key) ? prevKeys.filter(k => k !== key) : [...prevKeys, key]
      );
    });

  legendRow.append('rect')
    .attr('width', 12)
    .attr('height', 12)
    .attr('fill', isActive ? colorScale(key) : '#ccc'); // Dim if inactive

  legendRow.append('text')
    .attr('x', 18)
    .attr('y', 10)
    .attr('text-anchor', 'start')
    .style('font-size', '12px')
    .text(`Series ${index + 1} : ${totals[key]}`);
});


    return () => {
      d3.select('#multi-chart').selectAll('*').remove();
      tooltip.remove();
    };
  }, [dimensions, visibleKeys]);

  return <div id="multi-chart" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}></div>;
};

export default GroupedColumnChart;
