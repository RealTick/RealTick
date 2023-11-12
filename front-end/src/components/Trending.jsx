import React from "react";
import styles from "./component_css/Reccomender.module.css";
import Input from "./Input";

/* Input({ symbol, setSymbol, fetchData }) */

const Trending = ({ handleFetchData }) => {
  const tickers = ["META", "AAPL", "AMZN", "NVDA", "NFLX", "INTC"];

  const handleItemClick = (symbol) => {
    console.log("Button clicked with symbol:", symbol);
    handleFetchData(symbol);
  };

  return (
    <div className={styles.reccomenderContainer}>
      <h2 className={styles.title}>{"Similar"}</h2>
      <ul className={styles.listContainer}>
        {tickers.map((item, index) => (
          <li key={index} className={styles.listItem}>
            <button
              className={styles.invisibleButton}
              onClick={() => handleItemClick(item)}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Trending;
