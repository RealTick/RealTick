import React from 'react';
import Plot from 'plotly.js';

function SimpleCandlestickChart() {
  // Sample data for the candlestick chart
  const data = [{
    x: ['2022-01-01', '2022-01-02', '2022-01-03', '2022-01-04'],
    close: [10, 15, 13, 17],
    high: [11, 15.5, 14, 17.5],
    low: [9, 14.5, 12.5, 16.5],
    open: [10.5, 14.5, 13.5, 16.5],
    type: 'candlestick'
  }];

  const layout = {
    dragmode: 'zoom',
    xaxis: { title: 'Date' },
    yaxis: { title: 'Value' }
  };

  return <Plot data={data} layout={layout} />;
}

export default SimpleCandlestickChart;
