
import { useMemo } from 'react';

export default function useSetChart({ data, width, height, numXTicks, numYTicks }) {

  // Calculate the scale factors
  const { minX, maxX, minY, maxY, xScale, yScale } = useMemo(() => {
    // Extract the x and y values from the data
    const xValues = data.map(d => d.x);
    const yValues = data.map(d => d.y);

    // Find the minimum and maximum x and y values
    const minX = Math.min(...xValues);
    const maxX = Math.max(...xValues);
    const minY = Math.min(...yValues);
    const maxY = Math.max(...yValues);

    // Calculate the scale factors
    const xScale = (width - 50) / (maxX - minX);
    const yScale = (height - 50) / (maxY - minY);

    return { minX, maxX, minY, maxY, xScale, yScale };
  }, [data, width, height]);

  // Calculate the ticks
  const xTicks = useMemo(
    () => Array.from({ length: numXTicks }, (_, i) => minX + i * ((maxX - minX) / (numXTicks - 1))),
    [minX, maxX, numXTicks]
  );

  // Calculate the ticks
  const yTicks = useMemo(
    () => Array.from({ length: numYTicks }, (_, i) => minY + i * ((maxY - minY) / (numYTicks - 1))),
    [minY, maxY, numYTicks]
  );

  return { minX, maxX, minY, maxY, width, height, xScale, yScale, xTicks, yTicks };
}
