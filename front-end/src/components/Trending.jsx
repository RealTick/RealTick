import React from "react";
import styles from "./component_css/Trending.module.css"; // Update the CSS import if needed

const Trending = ({ trendingStocks, handleFetchData }) => {
  console.log("Trending Stocks:", trendingStocks);
  // Mapping trendingStocks to an array of objects with Symbol and Title
  const stocks = Array.isArray(trendingStocks)
    ? trendingStocks.map((stock) => ({
        symbol: stock.Symbol,
        title: stock.Title,
      }))
    : [];

  const handleItemClick = (symbol) => {
    console.log("Button clicked with symbol:", symbol);
    handleFetchData(symbol);
  };

  return (
    <div className={styles.trendingContainer}>
      <h2 className={styles.title}>Trending</h2>
      <ul className={styles.listContainer}>
        {stocks.map((stock, index) => (
          <li key={index} className={styles.listItem}>
            <button
              className={styles.invisibleButton}
              onClick={() => handleItemClick(stock.symbol)}
            >
              {stock.symbol}
              {/* - {stock.title} */}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Trending;
