import React from 'react';
import styles from './component_css/StockInfo.module.css';

const StockInfo = ({ symbol, data }) => {
  return (
    <div className={styles.stockDataContainer}>
      <h1 className={styles.title}>{symbol}</h1>
      <p className={styles.dataPoint}>Current Price: {data.current_price}</p>
      <p className={styles.dataPoint}>Market Cap: {data.market_cap}</p>
      <p className={styles.dataPoint}>Yearly Return: {data.yearly_return}</p>
      <p className={styles.dataPoint}>Year-To-Date Return: {data.ytd_return}</p>
      <p className={styles.dataPoint}>Opening Price: {data.opening_price}</p>
      
      {/* Additional data points go here */}
      {/* Display the chart data (You can integrate Chart.js for better visualization later) */}
    </div>
  );
};

export default StockInfo;