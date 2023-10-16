import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import styles from './component_css/LineChart.module.css';

Chart.register(...registerables);

function LineChart({ chartData }) {
  const chartLabels = Object.keys(chartData || {}); 
  const chartDataset = Object.values(chartData || {}); 

  const data = {
    labels: chartLabels,
    datasets: [{
      label: 'Stock Price',
      data: chartDataset,
      fill: true,
      borderColor: 'rgb(0, 0, 0)',
      tension: 0.1,
    }]
  };

  return ( 
    <div className={styles.lineChartContainer}>
      <Line data={data} />
    </div>
  );
};

export default LineChart;
