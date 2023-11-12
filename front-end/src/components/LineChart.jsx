import React from "react";
import Plot from "react-plotly.js";

function LineChart({ chartData, layout }) {
  const dates = Object.keys(chartData || {});
  const openPrices = dates.map((date) => chartData[date].open);

  const data = [
    {
      type: "scatter",
      mode: "lines",
      x: dates,
      y: openPrices,
    },
  ];

  const lineLayout = {
    ...layout,
    xaxis: {
      ...layout.xaxis,
      rangeslider: { visible: true },
    },
  };

  return <Plot data={data} layout={lineLayout} />;
}

export default React.memo(LineChart);
