import React from 'react';
import Plot from 'react-plotly.js';
import styles from './component_css/CandlestickChart.module.css';

function CandlestickChart({ chartData }) {
  const dates = Object.keys(chartData || {});

  const openPrices = dates.map(date => chartData[date].open);
  const highPrices = dates.map(date => chartData[date].high);
  const lowPrices = dates.map(date => chartData[date].low);
  const closePrices = dates.map(date => chartData[date].close);

  const data = [{
    type: 'candlestick',
    x: dates,
    open: openPrices,
    high: highPrices,
    low: lowPrices,
    close: closePrices
  }];

  const layout = {
    title: 'Stock Price',
    xaxis: {
      title: 'Date',
    },
    yaxis: {
      title: 'Price',
    }
  };

  return (
    <div className={styles.candlestickChartContainer}>
        <Plot
            data={data}
            layout={layout}
        />
    </div>
);
}

export default CandlestickChart;