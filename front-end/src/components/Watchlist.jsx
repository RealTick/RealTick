import React, { useState, useEffect } from 'react';
import styles from './component_css/Watchlist.module.css';

const Watchlist = ({ handleFetchData, currentTicker }) => {
    const [watchlist, setWatchlist] = useState(() => {
        // Load watchlist from local storage
        return JSON.parse(localStorage.getItem('watchlist')) || [];
    });

    useEffect(() => {
        // Save the watchlist to local storage whenever it changes
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
    }, [watchlist]);

    const handleItemClick = (symbol) => {
        console.log("Ticker clicked:", symbol);
        handleFetchData(symbol);
    };

    const handlePinClick = () => {
        if (currentTicker && !watchlist.includes(currentTicker)) {
            setWatchlist([...watchlist, currentTicker]);
        }
    };

    return (
        <div className={styles.watchlistContainer}>
            <h2 className={styles.title}>{"Watchlist"}</h2>
            <button className={styles.pinButton} onClick={handlePinClick}>
                Pin Current
            </button>
            <ul className={styles.listContainer}>
                {watchlist.map((item, index) => (
                    <li key={index} className={styles.listItem}>
                        <button className={styles.invisibleButton} onClick={() => handleItemClick(item)}>
                            {item}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Watchlist;
