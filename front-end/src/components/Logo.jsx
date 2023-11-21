import React from "react";
import styles from "./component_css/Logo.module.css";

const Logo = ({ onReset }) => {
  const data = {
    text: "RealTick",
  };

  const handleSubmit = () => {
    onReset();
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
