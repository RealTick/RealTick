import React, { useContext, useState } from "react";
import Plot from "react-plotly.js";
import ChartSelector from "./ChartSelector";
import CandlestickChart from "./charts/CandlestickChart";
import LineChart from "./charts/LineChart";
import styles from "./component_css/ChartContainer.module.css";
import OHLCChart from "./charts/OHLCChart";
import AreaChart from "./charts/AreaChart";
import RealtimeChart from "./charts/RealtimeChart";
import CompareTo from "./CompareTo";

function ChartContainer({ chartData, symbol }) {
  const [chartType, setChartType] = useState("line");

  const renderChart = () => {
    switch (chartType) {
      case "line":
        return <LineChart chartData={chartData} />;
      case "candlestick":
        return <CandlestickChart chartData={chartData} />;
      case "ohlc":
        return <OHLCChart chartData={chartData} />;
      case "area":
        return <AreaChart chartData={chartData} />;
      case "realtime":
        return <RealtimeChart chartData={chartData} symbol={symbol} />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartHeader}>
        <ChartSelector onChartTypeChange={setChartType} />
        <CompareTo symbol={symbol} />
      </div>
      {renderChart()}
    </div>
  );
}

export default ChartContainer;
