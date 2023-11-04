import React from 'react';
import styles from './component_css/Reccomender.module.css';

const Reccomender = ({ similarStocks, handleFetchData }) => {
    console.log("Similar Stocks:", similarStocks);

    // Mapping similarStocks to an array of objects with Symbol and Title
    const stocks = Array.isArray(similarStocks) ? similarStocks.map(stock => ({
        symbol: stock.Symbol,
        title: stock.Title
    })) : [];

    const handleItemClick = (symbol) => {
        console.log("Button clicked with symbol:", symbol);
        handleFetchData(symbol);
    };

    return (
        <div className={styles.reccomenderContainer}>
            <h2 className={styles.title}>Similar Stocks</h2>
            <ul className={styles.listContainer}>
                {stocks.map((stock, index) => (
                    <li key={index} className={styles.listItem}>
                        <button className={styles.invisibleButton} onClick={() => handleItemClick(stock.symbol)}>
                            {stock.symbol} 
                            {/* - {stock.title} */}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Reccomender;
