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
import AdvancedLineChart from "./charts/AdvancedLineChart";
import Ichimoku from "./charts/Ichimoku";
import CompareChart from "./charts/CompareChart";

function ChartContainer({ chartData, symbol, chartType, setChartType }) {
  const [fetchedData, setFetchedData] = useState(null);

  const handleDataFetched = (data) => {
    setFetchedData(data);
  };

  const renderChart = () => {
    switch (chartType) {
      case "line":
        return <LineChart chartData={chartData} />;
      case "candlestick":
        return <CandlestickChart chartData={chartData} />;
      case "ohlc":
        return <OHLCChart chartData={chartData} />;
      case "ichimoku":
        return <Ichimoku chartData={chartData} />;
      case "realtime":
        return <RealtimeChart chartData={chartData} symbol={symbol} />;
      case "advancedline":
        return <AdvancedLineChart chartData={chartData} symbol={symbol} />;
      case "comparetochart":
        return <CompareChart chartData={fetchedData} symbol={symbol} />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartHeader}>
        <ChartSelector onChartTypeChange={setChartType} />
        {chartType === "comparetochart" && (
          <CompareTo symbol={symbol} onDataFetched={handleDataFetched} />
        )}
      </div>
      {renderChart()}
    </div>
  );
}

export default ChartContainer;
