import React from 'react';
import styles from './component_css/StockInfo.module.css';

const StockInfo = ({ symbol, data }) => {
  return (
    <div className={styles.stockDataContainer}>
      <h1 className={styles.title}>{data.stock_display_name}</h1>

      {/* TODO: This should be with the title and different CSS group so that it changes color on change of data */}
      <p className={styles.dataPoint}>Current Price: {data.current_price}</p>

      <p className={styles.dataPoint}>Previous Close: {data.prev_close}</p>
      <p className={styles.dataPoint}>Market Cap: {data.market_cap}</p>
      <p className={styles.dataPoint}>Open: {data.opening_price}</p>
      <p className={styles.dataPoint}>Beta (5Y Monthly): {data.beta}</p>
      <p className={styles.dataPoint}>52 Week Range: {data.fifty_two_week_range}</p>


      <p className={styles.dataPoint}>Yearly Return: {data.yearly_return}</p>
      <p className={styles.dataPoint}>Year-To-Date Return: {data.ytd_return}</p>
      
      
      {/* Additional data points go here */}
      {/* Display the chart data (You can integrate Chart.js for better visualization later) */}
    </div>
  );
};

export default StockInfo;