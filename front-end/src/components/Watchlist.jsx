import React, { useState, useEffect } from "react";
import styles from "./component_css/Watchlist.module.css";
import Search from "./Search";


const Watchlist = ({ handleFetchData, displayedSymbol }) => {
  const [watchlist, setWatchlist] = useState(() => {
    const storedWatchlist = localStorage.getItem("watchlist");
    return storedWatchlist ? JSON.parse(storedWatchlist) : [];
  });

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const pinCurrentSymbol = (displayedSymbol) => {
    console.log("Appending Watchlist:", displayedSymbol);
    if (displayedSymbol && !watchlist.includes(displayedSymbol)) {
      const updatedWatchlist = [...watchlist, displayedSymbol];
      setWatchlist(updatedWatchlist);
    }
  };

  const handleItemClick = (displayedSymbol) => {
    console.log("Button clicked with symbol:", displayedSymbol);
    handleFetchData(displayedSymbol);
  };

  return (
    <div className={styles.watchlistContainer}>
      <h2 className={styles.title}>Watchlist</h2>
      <button 
        className={styles.pinButton} 
        onClick={() => pinCurrentSymbol(displayedSymbol)} // Ensure symbol prop is being passed correctly
      >
        Pin Current
      </button>
      <ul className={styles.listContainer}>
        {watchlist.map((item, index) => (
          <li key={item} className={styles.listItem}>
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

export default Watchlist;
