import React, { useState } from "react";
import Modal from "react-modal";
import { IconMenu2, IconSquareRoundedX } from "@tabler/icons-react";
import styles from "./component_css/Settings.module.css";
import { useTheme } from "../../src/contexts/ThemeContext";

Modal.setAppElement("#root");

function Settings() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const themes = ["dark", "light", "purple"];

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  return (
    <div>
      <button onClick={toggleModal} className={styles.settingsButton}>
        <IconMenu2 size={30} stroke={2} />
      </button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={toggleModal}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <h2>Settings</h2>
        <div className={styles.setting}>
          <label htmlFor="theme-select">Theme: </label>
          <select
            id="theme-select"
            value={theme}
            onChange={handleThemeChange}
            className={styles.themeSelect}
          >
            {themes.map((themeOption) => (
              <option key={themeOption} value={themeOption}>
                {themeOption.charAt(0).toUpperCase() + themeOption.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div>blahblahblah</div>
        <div>blahblahblah</div>
        <div>blahblahblah</div>
        <button onClick={toggleModal} className={styles.closeButton}>
          <IconSquareRoundedX size={24} stroke={2} />
        </button>
      </Modal>
    </div>
  );
}

export default Settings;
