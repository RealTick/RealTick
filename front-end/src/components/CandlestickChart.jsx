// import React, { useEffect } from 'react';
// import { Chart } from 'chart.js';
// import { CandlestickController, LinearScale, TimeScale, Title } from 'chart.js';
// import styles from './component_css/CandlestickChart.module.css';

// // Register the necessary modules for the candlestick chart
// Chart.register(CandlestickController, LinearScale, TimeScale, Title);

// const CandlestickChart = () => {
  
//   useEffect(() => {
//     const data = {
//       labels: ["2023-01-01", "2023-01-02", "2023-01-03", "2023-01-04", "2023-01-05"],
//       datasets: [{
//         label: 'Candlestick Data',
//         data: [
//           { t: new Date("2023-01-01").getTime(), o: 110, h: 120, l: 105, c: 118 },
//           { t: new Date("2023-01-02").getTime(), o: 119, h: 125, l: 115, c: 122 },
//           { t: new Date("2023-01-03").getTime(), o: 121, h: 128, l: 120, c: 126 },
//           { t: new Date("2023-01-04").getTime(), o: 127, h: 130, l: 124, c: 129 },
//           { t: new Date("2023-01-05").getTime(), o: 129, h: 134, l: 128, c: 132 }
//         ]
//       }]
//     };

//     const options = {
//       scales: {
//         x: {
//           type: 'time'
//         },
//         y: {
//           type: 'linear'
//         }
//       }
//     };

//     new Chart(document.getElementById('candlestickChart'), {
//       type: 'candlestick',
//       data: data,
//       options: options
//     });
//   }, []);

//   return <canvas id="candlestickChart" width="400" height="400"></canvas>;
// };

// export default CandlestickChart;
