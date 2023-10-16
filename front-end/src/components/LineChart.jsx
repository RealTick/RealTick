// LineChart.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import styles from './component_css/LineChart.module.css'; // maybe for all charts? dunno if multiple css modules needed



Chart.register(...registerables);

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  datasets: [{
    label: 'Sales',
    data: [3, 2, 2, 1, 5],
    fill: true,
    borderColor: 'rgb(0, 0, 0)',
    tension: 0.1,
  }]
};

function LineChart () {

  return ( 
  <div className={styles.lineChartContainer}>
    <Line data={data} />
  </div>
  );
};

export default LineChart;