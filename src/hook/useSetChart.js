
import { useMemo } from 'react';

export default function useSetChart({ data, width, height, numXTicks, numYTicks }) {
  const { minX, maxX, minY, maxY, xScale, yScale } = useMemo(() => {
    const xValues = data.map(d => d.x);
    const yValues = data.map(d => d.y);

    const minX = Math.min(...xValues);
    const maxX = Math.max(...xValues);
    const minY = Math.min(...yValues);
    const maxY = Math.max(...yValues);

    const xScale = (width - 50) / (maxX - minX);
    const yScale = (height - 50) / (maxY - minY);

    return { minX, maxX, minY, maxY, xScale, yScale };
  }, [data, width, height]);

  const xTicks = useMemo(
    () => Array.from({ length: numXTicks }, (_, i) => minX + i * ((maxX - minX) / (numXTicks - 1))),
    [minX, maxX, numXTicks]
  );

  const yTicks = useMemo(
    () => Array.from({ length: numYTicks }, (_, i) => minY + i * ((maxY - minY) / (numYTicks - 1))),
    [minY, maxY, numYTicks]
  );

  return { minX, maxX, minY, maxY, width, height, xScale, yScale, xTicks, yTicks };
}
