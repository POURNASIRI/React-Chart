import React, { memo, useMemo } from 'react';

/**
 * Renders a line chart using the provided data, minimum and maximum x and y values, 
 * and scales. The chart is rendered as a path element with the specified stroke color and width.
 *
 * @param {Object} props - The properties for the chart.
 * @param {Array} props.data - The data points for the chart.
 * @param {number} props.minX - The minimum x value for the chart.
 * @param {number} props.minY - The minimum y value for the chart.
 * @param {number} props.xScale - The scale for the x values.
 * @param {number} props.yScale - The scale for the y values.
 * @param {number} props.height - The height of the chart.
 * @return {JSX.Element} The rendered chart as a path element.
 */
const ChartPointsLine = ({ data, minX, minY, xScale, yScale, height }) => {

  // Create the path data for the line
  const pathData = useMemo(() => {
    if (!data || !data.length) return '';
    const moveTo = `M${25 + (data[0].x - minX) * xScale},${height - 25 - (data[0].y - minY) * yScale}`;
    const lineTo = data
      .map(
        (d) => `L${25 + (d.x - minX) * xScale},${height - 25 - (d.y - minY) * yScale}`
      )
      .join(' ');
    return `${moveTo} ${lineTo}`;
  }, [data, minX, minY, xScale, yScale, height]);

  return (
    <path
      d={pathData}
      fill="none"
      stroke="#3498db"
      strokeWidth={2}
    />
  );
};

export default memo(ChartPointsLine);
