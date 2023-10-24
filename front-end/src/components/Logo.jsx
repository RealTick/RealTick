import React from 'react';
import styles from './component_css/Logo.module.css';

const Logo = () => {
    const data = {
        text: "RealTick"
    };

    return (
        <div className={styles.logoContainer}>
            {data.text}
        </div>
    );
};

export default Logo;