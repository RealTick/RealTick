import React, { useState, useEffect } from "react";
import styles from "./component_css/Watchlist.module.css";
import Search from "./Search";
import { IconPin, IconPinFilled } from "@tabler/icons-react";

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
    let updatedWatchlist;

    if (displayedSymbol && !watchlist.includes(displayedSymbol)) {
      updatedWatchlist = [...watchlist, displayedSymbol];
    } 
    else if (displayedSymbol && watchlist.includes(displayedSymbol)) {
      updatedWatchlist = watchlist.filter(symbol => symbol !== displayedSymbol);
    }

    setWatchlist(updatedWatchlist);
  };

  const clearWatchlist = () => {
    setWatchlist([]);
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
        {
          watchlist.includes(displayedSymbol) ?
          <IconPinFilled size={24} stroke={2} /> : // Display this icon when displayedSymbol is in the watchlist
          <IconPin size={24} stroke={2} /> // Display this icon when displayedSymbol is not in the watchlist
        }
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
      <button 
        className={styles.clearButton} 
        onClick={() => clearWatchlist()} // Ensure symbol prop is being passed correctly
      >
        Clear
      </button>
    </div>
  );
};

export default Watchlist;
