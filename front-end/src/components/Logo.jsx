import React from 'react';
import styles from './component_css/Logo.module.css';

const Logo = () => {
    const data = {
        text: "RealTick"
    };

    const handleSubmit = () => {
        window.location.reload(false);
      };

    return (
        <div className={styles.logoContainer}>
            <button onClick={handleSubmit} className={styles.refreshButton}>
                
                {data.text}
            </button>
        </div>
    );
};

export default Logo;