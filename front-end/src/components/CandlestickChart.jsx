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
    paper_bgcolor: 'rgba(210, 210, 210, 1)',
    plot_bgcolor: 'rgba(82, 114, 242, 1)',
    xaxis: {
        title: 'Date',
        rangeselector: {
           x: 0,
           y: 1.2,
           xanchor: 'left',
           font: {size:8},
           buttons: [{
               step: 'month',
               stepmode: 'backward',
               count: 1,
               label: '1 month'
           }, {
               step: 'month',
               stepmode: 'backward',
               count: 6,
               label: '6 months'
           }, {
               step: 'all',
               label: 'All dates'
           }]
        }
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