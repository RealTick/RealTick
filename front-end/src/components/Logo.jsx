import { React } from "react";
import styles from "./component_css/Logo.module.css";
import LogoSVG from "../assets/realtick_logo_expanded.svg?react";

const Logo = ({ onReset }) => {
  return (
    <div className={styles.logoContainer}>
      <button onClick={onReset} className={styles.refreshButton}>
        <LogoSVG />
      </button>
    </div>
  );
};

export default Logo;
