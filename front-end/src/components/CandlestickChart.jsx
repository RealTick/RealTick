import React from "react";
import Plot from "react-plotly.js";

function CandlestickChart({ chartData, layout }) {
  const dates = Object.keys(chartData || {});
  const openPrices = dates.map((date) => chartData[date].open);
  const highPrices = dates.map((date) => chartData[date].high);
  const lowPrices = dates.map((date) => chartData[date].low);
  const closePrices = dates.map((date) => chartData[date].close);

  const data = [
    {
      type: "candlestick",
      x: dates,
      open: openPrices,
      high: highPrices,
      low: lowPrices,
      close: closePrices,
    },
  ];

  return <Plot data={data} layout={layout} />;
}

export default React.memo(CandlestickChart);
