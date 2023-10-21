import React from 'react';
import styles from './component_css/StockInfo.module.css';

const StockInfo = ({ symbol, data }) => {

  // delta coloring
  const priceDiffClass = data.price_diff >= 0 ? styles.positive : styles.negative;

  
  return (
    <div className={styles.stockDataContainer}>
      <h1 className={styles.title}>{data.stock_display_name}</h1>

      <div className={styles.dataColumns}>
        <div className={styles.column}>
          <div className={styles.dataPoint}>
            <span className={styles.dataTitle}>Current Price:</span>
            <span className={styles.dataValue}>{data.current_price}</span>
          </div>
          <div className={styles.dataPoint}>
            <span className={styles.dataTitle}>Previous Close:</span>
            <span className={styles.dataValue}>{data.prev_close}</span>
          </div>
          <div className={styles.dataPoint}>
            <span className={styles.dataTitle}>Market Cap:</span>
            <span className={styles.dataValue}>{data.market_cap}</span>
          </div>
          <div className={styles.dataPoint}>
            <span className={styles.dataTitle}>Open:</span>
            <span className={styles.dataValue}>{data.opening_price}</span>
          </div>
          <div className={styles.dataPoint}>
            <span className={styles.dataTitle}>Beta (5Y Monthly):</span>
            <span className={styles.dataValue}>{data.beta}</span>
          </div>
          <div className={styles.dataPoint}>
            <span className={styles.dataTitle}>Day's Range:</span>
            <span className={styles.dataValue}>{data.days_range}</span>
          </div>
        </div>
        <div className={styles.column}>
          <div className={styles.dataPoint}>
            <span className={styles.dataTitle}>Difference:</span>
            <span className={`${styles.dataPoint} ${priceDiffClass}`}>{data.price_diff} ({data.price_diff_percentage}%)</span>
          </div>
          <div className={styles.dataPoint}>
            <span className={styles.dataTitle}>52 Week Range:</span>
            <span className={styles.dataValue}>{data.fifty_two_week_range}</span>
          </div>
          <div className={styles.dataPoint}>
            <span className={styles.dataTitle}>Forward Dividend & Yield (FIX):</span>
            <span className={styles.dataValue}>{data.forward_dividend_yield}</span>
          </div>
          <div className={styles.dataPoint}>
            <span className={styles.dataTitle}>Volume:</span>
            <span className={styles.dataValue}>{data.volume}</span>
          </div>
          <div className={styles.dataPoint}>
            <span className={styles.dataTitle}>Yearly Return:</span>
            <span className={styles.dataValue}>{data.yearly_return}</span>
          </div>
          <div className={styles.dataPoint}>
            <span className={styles.dataTitle}>Year-To-Date Return:</span>
            <span className={styles.dataValue}>{data.ytd_return}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockInfo;