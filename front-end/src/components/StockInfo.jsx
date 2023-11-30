import React, { useState, useEffect } from "react";
import styles from "./component_css/StockInfo.module.css";
import fetchCurrentPriceData from "./StockCurrentService";

const StockInfo = ({ symbol, data }) => {
  const [realTimeData, setRealTimeData] = useState({
    price_change_percentage: "",
    real_time_price: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await fetchCurrentPriceData(symbol);
        setRealTimeData({
          price_change_percentage: fetchedData.price_change_percentage,
          real_time_price: fetchedData.real_time_price,
        });
      } catch (err) {
        console.error("Error fetching stock data:", err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000); // Fetch data every 60 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [symbol]);

  // delta coloring
  // const priceDiffClass = realTimeData.price_change_percentage
  //   .trim()
  //   .startsWith("+")
  //   ? styles.positive
  //   : styles.negative;

  const priceDiffClass = data.price_diff.trim().startsWith("+")
    ? styles.positive
    : styles.negative;

  return (
    <div className={styles.stockDataContainer}>
      <h1 className={styles.title}>
        {data.stock_display_name}{" "}
        <span className={priceDiffClass}>
          {/* {realTimeData.price_change_percentage} */}
          <span className={styles.priceDiffClass}>{data.price_diff}</span>
        </span>
      </h1>

      {/* <div className={styles.dataPoint}>

            <span className={styles.dataTitle}>Difference:</span>
            <span className={`${styles.dataPoint} ${priceDiffClass}`}>{data.price_diff} ({data.price_diff_percentage}%)</span>

      </div> */}

      <div className={styles.dataColumns}>
        <div className={styles.column}>
          <div className={styles.dataPoint}>
            <span className={styles.dataTitle}>Current Price:</span>
            <span className={styles.dataValue}>
              {realTimeData.real_time_price}
            </span>
          </div>

          <div className={styles.dataPoint}>
            <span className={styles.dataTitle}>Previous Close:</span>
            <span className={styles.dataValue}>{data.prev_close}</span>
          </div>

          <div className={styles.dataPoint}>
            <span className={styles.dataTitle}>Open:</span>
            <span className={styles.dataValue}>{data.opening_price}</span>
          </div>

          {/* <div className={styles.dataPoint}>
            <span className={styles.dataTitle}>Bid:</span>
            <span className={styles.dataValue}>{data.bid}</span>
          </div> */}

          {/* <div className={styles.dataPoint}>
            <span className={styles.dataTitle}>Ask:</span>
            <span className={styles.dataValue}>{data.ask}</span>
          </div> */}

          <div className={styles.dataPoint}>
            <span className={styles.dataTitle}>Day's Range:</span>
            <span className={styles.dataValue}>{data.days_range}</span>
          </div>

          <div className={styles.dataPoint}>
            <span className={styles.dataTitle}>
              52 Week <br></br>Range:
            </span>
            <span className={styles.dataValue}>
              {data.fifty_two_week_range}
            </span>
          </div>

          <div className={styles.dataPoint}>
            <span className={styles.dataTitle}>Earnings Date:</span>
            <span className={styles.dataValue}>{data.earnings_date}</span>
          </div>

          <div className={styles.dataPoint}>
            <span className={styles.dataTitle}>1y Target Est:</span>
            <span className={styles.dataValue}>{data.yr_target}</span>
          </div>
        </div>
        <div className={styles.column}>
          <div className={styles.dataPoint}>
            <span className={styles.dataTitle}>Market Cap:</span>
            <span className={styles.dataValue}>{data.market_cap}</span>
          </div>
          <div className={styles.dataPoint}>
            <span className={styles.dataTitle}>
              Beta <br></br>(5Y Monthly):
            </span>
            <span className={styles.dataValue}>{data.beta}</span>
          </div>

          <div className={styles.dataPoint}>
            <span className={styles.dataTitle}>Volume:</span>
            <span className={styles.dataValue}>{data.volume}</span>
          </div>

          {/* <div className={styles.dataPoint}>
            <span className={styles.dataTitle}>Avg. Volume:</span>
            <span className={styles.dataValue}>{data.Avg_volume}</span>
          </div> */}

          <div className={styles.dataPoint}>
            <span className={styles.dataTitle}>PE Ratio (TTM):</span>
            <span className={styles.dataValue}>{data.PE_ratio}</span>
          </div>

          <div className={styles.dataPoint}>
            <span className={styles.dataTitle}>EPS (TTM):</span>
            <span className={styles.dataValue}>{data.EPS}</span>
          </div>

          <div className={styles.dataPoint}>
            <span className={styles.dataTitle}>
              Forward <br></br> Dividend & Yield:
            </span>
            <span className={styles.dataValue}>
              {data.forward_dividend_yield}
            </span>
          </div>
          <div className={styles.dataPoint}>
            <span className={styles.dataTitle}>
              Ex-Dividend <br></br>Date:
            </span>
            <span className={styles.dataValue}>{data.EX_dividend}</span>
          </div>

          {/* <div className={styles.dataPoint}>
            <span className={styles.dataTitle}>EMPTY:</span>
            <span className={styles.dataValue}>{0}</span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default StockInfo;
