import React, { memo } from 'react';

/**
 * Renders tick marks and labels for an SVG axis.
 * 
 * This component displays a line and a label at a specific tick position. 
 * It adjusts the position and orientation based on whether the tick is 
 * for a horizontal or vertical axis.
 * 
 * @param {Object} props - The component props.
 * @param {number} props.tick - The value of the tick mark.
 * @param {number} props.height - The height of the SVG container.
 * @param {number} props.width - The width of the SVG container.
 * @param {function} props.yScale - The y-axis scale function.
 * @param {function} props.xScale - The x-axis scale function.
 * @param {boolean} props.axis - Determines if the tick is part of an axis (true for vertical, false for horizontal).
 * @param {number} props.minX - The minimum x value of the data range.
 * @param {number} props.minY - The minimum y value of the data range.
 * 
 * @returns {JSX.Element} - A group element containing a line and a text element representing a tick mark.
 */
const Ticks = ({
  tick,
  height,
  width,
  yScale,
  xScale,
  axis,
  minX,
  minY,
}) => {
  // Calculate the line end points and text position based on axis orientation
  const X1 = axis ? width - 25 : 25 + (tick - minX) * xScale;
  const X2 = axis ? 25 : 25 + (tick - minX) * xScale;
  const Y1 = axis ? height - 25 - (tick - minY) * yScale : height - 25;
  const Y2 = axis ? height - 25 - (tick - minY) * yScale : height - height + 25;

  // Calculate the text position based on axis orientation
  const X = axis ? 10 : 25 + (tick - minX) * xScale;
  const Y = axis ? height - 25 - (tick - minY) * yScale : height - 5;

  // Apply rotation for vertical axis
  const transform = axis ? `rotate(-90, ${10}, ${height - 25 - (tick - minY) * yScale})` : '';

  return (
    <g>
      <line
        x1={X1}
        y1={Y1}
        x2={X2}
        y2={Y2}
        stroke="#ccc"
        strokeWidth={1}
      />
      <text
        transform={transform}
        x={X}
        y={Y}
        textAnchor="middle"
        fontSize={12}
        fill="#666"
      >
        {tick.toFixed(1)}
      </text>
    </g>
  );
};

export default memo(Ticks);
