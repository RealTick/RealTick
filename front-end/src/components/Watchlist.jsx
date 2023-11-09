import React from 'react';
import styles from './component_css/Watchlist.module.css';
import Input from './Input';

const Watchlist = ({ handleFetchData }) => {
    const tickers = [
        'META',
        'AAPL',
        'AMZN',
        'NVDA',
        'NFLX',
        'INTC'
    ];
      
    const handleItemClick = (symbol) => {
        console.log("Button clicked with symbol:", symbol);
        handleFetchData(symbol);
    };

    return (
        <div className={styles.watchlistContainer}>
            <h2 className={styles.title}>{"Watchlist"}</h2>
            <ul className={styles.listContainer}>
                {tickers.map((item, index) => (
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