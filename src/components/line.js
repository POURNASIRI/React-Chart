
import React, { memo } from 'react';

/**
 * Renders a line inside an SVG container.
 * 
 * This component draws a line that can be oriented based on whether it's 
 * used for an axis. The line's position and orientation are determined by 
 * the `axis` prop and the `startPoint` value.
 * 
 * @param {Object} props - The component props.
 * @param {boolean} props.axis - Determines if the line is for an axis (`true`) or not (`false`).
 * @param {number} props.startPoint - The starting coordinate of the line, which affects its position.
 * @param {number} props.height - The height of the SVG container.
 * @param {number} props.width - The width of the SVG container.
 * 
 * @returns {JSX.Element} - An SVG element containing a line.
 */
const Line = ({ axis, startPoint, height, width }) => {
  const x1 = startPoint;
  const y1 = axis ? startPoint : height - startPoint;
  const x2 = axis ? startPoint : width - startPoint;
  const y2 = height - startPoint;

  return (
    <svg>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="#ccc"
        strokeWidth={1}
      />
    </svg>
  );
};

export default memo(Line);
