import React, { useState, memo, useCallback } from 'react';

/**
 * Renders a data point as a circle on an SVG container, with optional tooltip functionality.
 * 
 * This component displays a circle at a specific (x, y) data point and shows a tooltip with 
 * the data point's coordinates when the mouse hovers over the circle.
 * 
 * @param {Object} props - The component props.
 * @param {Object} props.d - The data point object containing `x` and `y` coordinates.
 * @param {number} props.minX - The minimum x value of the data range.
 * @param {number} props.minY - The minimum y value of the data range.
 * @param {function} props.xScale - The x-axis scale function.
 * @param {function} props.yScale - The y-axis scale function.
 * @param {number} props.width - The width of the SVG container.
 * @param {number} props.height - The height of the SVG container.
 * 
 * @returns {JSX.Element} - An SVG group element containing a circle and, optionally, a tooltip.
 */
const DataPoint = ({ d, minX, minY, xScale, yScale, height }) => {
  const [{ showTooltip, tooltipData }, setTooltipState] = useState({
    showTooltip: false,
    tooltipData: null,
  });

  // Calculate the position of the data point circle and tooltip
  const CX = 25 + (d.x - minX) * xScale;
  const CY = height - 25 - (d.y - minY) * yScale;
  const X = CX + 10;
  const Y = CY;

  // Handler functions for showing and hiding the tooltip
  const showTooltipHandler = useCallback(
    (data) => {
      setTooltipState({ showTooltip: true, tooltipData: data });
    },
    [setTooltipState]
  );

  // Handler function for hiding the tooltip
  const hideTooltipHandler = useCallback(() => {
    setTooltipState({ showTooltip: false, tooltipData: null });
  }, [setTooltipState]);

  return (
    <g>
      {/* Data Point */}
      <circle
        cx={CX}
        cy={CY}
        r={4}
        fill="#3498db"
        onMouseEnter={() => showTooltipHandler(d)}
        onMouseLeave={hideTooltipHandler}
      />
      {showTooltip && tooltipData === d && (
        <g>
          {/* Tooltip */}
          <rect
            x={X}
            y={Y - 14}
            width={120}
            height={20}
            fill="rgb(173, 255, 47)"
            rx="3"
            ry="3"
          />
          <text
            x={X + 4}
            y={Y}
            fontSize={14}
            fill="#333"
            textAnchor="start"
            style={{
              fontFamily: 'Arial, sans-serif',
              fontWeight: 'bold',
            }}
          >
            (x: {d.x.toFixed(0)}, y: {d.y.toFixed(3)})
          </text>
        </g>
      )}
    </g>
  );
};

export default memo(DataPoint);
