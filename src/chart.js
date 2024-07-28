import './components/Chart.css';
import { data } from './constant/data';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import Line from './components/line';
import Ticks from './components/ticks';
import DataPoint from './components/data-point';
import useSetChart from './hook/useSetChart';
import ChartPointsLine from './components/chart-points-line';
import { useState, useMemo, memo } from 'react';
import Button from './components/button';

/**
 * Renders a Line Chart with zoom and pan capabilities.
 * 
 * This component uses `react-zoom-pan-pinch` to enable zooming and panning functionality.
 * It displays a line chart with axes, ticks, data points, and a connecting line for the data points.
 * It also includes error handling for data validation.
 * 
 * @returns {JSX.Element} - A JSX element containing the entire chart with zoom and pan functionality.
 */
const LineChart = () => {
  const [XTicks, setXTicks] = useState(5);
  const [YTicks, setYTicks] = useState(5);
  const [error, setError] = useState(null);

  const chartConfig = useSetChart({
    data,
    width: 900,
    height: 400,
    numXTicks: XTicks,
    numYTicks: YTicks,
  });

  const {
    minX, maxX, minY, maxY, width, height, xScale, yScale, xTicks, yTicks,
  } = chartConfig;

  // Error handling: check if the data is cacheable
  useMemo(() => {
    if (!Array.isArray(data) || data.length === 0) {
      setError('Something went wrong... please try again later');
    } else {
      setError(null);
    }
  }, [data]);

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
      <div className="title">
        <h1>Line Chart</h1>
        <p>
          Hover over the chart to zoom in and out using mouse scroll. You can also view details of each point by hovering over it.
        </p>
        <Button state={XTicks} setState={setXTicks} />
        <Button state={YTicks} setState={setYTicks} />
      </div>
      <TransformWrapper>
        <TransformComponent>
          <div className="chart-container">
            <svg width={width} height={height} className="chart">
              <Line startPoint={25} height={height} width={width} />

              {xTicks.map((tick, i) => (
                <Ticks
                  key={i}
                  tick={tick}
                  height={height}
                  width={width}
                  yScale={yScale}
                  xScale={xScale}
                  axis={false}
                  minX={minX}
                  minY={minY}
                />
              ))}

              <Line axis={true} startPoint={25} height={height} width={width} />

              {yTicks.map((tick, i) => (
                <Ticks
                  key={i}
                  tick={tick}
                  yScale={yScale}
                  minY={minY}
                  maxY={maxY}
                  xScale={xScale}
                  minX={minX}
                  maxX={maxX}
                  height={height}
                  width={width}
                  axis={true}
                />
              ))}

              <g>
                {data.map((d, i) => (
                  <DataPoint
                    key={i}
                    d={d}
                    height={height}
                    minX={minX}
                    minY={minY}
                    xScale={xScale}
                    yScale={yScale}
                  />
                ))}
              </g>

              <ChartPointsLine
                data={data}
                minX={minX}
                minY={minY}
                xScale={xScale}
                yScale={yScale}
                height={height}
              />
            </svg>
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};

export default memo(LineChart);
