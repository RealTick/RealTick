import React from 'react';
import styles from './component_css/Reccomender.module.css';

const Reccomender = (  ) => {
    const tickers = [
        'META',
        'AAPL',
        'AMZN',
        'NVDA',
        'NFLX',
        'INTL'
      ];

    return (
        <div className={styles.reccomenderContainer}>
            <ul className={styles.listContainer}>
                {tickers.map((item, index) => (
                <li key={index} className={styles.listItem}>{item}</li>
                ))}
            </ul>
        </div>
    );
};

export default Reccomender;