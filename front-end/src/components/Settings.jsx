import React, { useState } from "react";
import Modal from "react-modal";
import { IconMenu2, IconSquareRoundedX } from "@tabler/icons-react";
import styles from "./component_css/Settings.module.css";
import { useTheme } from "../../src/contexts/ThemeContext";

Modal.setAppElement("#root");

function Settings() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const themes = ["dark", "light", "purple", "bubblegum", "forest"];

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleThemeChange = (themeOption) => {
    setTheme(themeOption);
    toggleModal();
    window.location.reload();
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
          <label>Theme:</label>
          <div className={styles.themeButtons}>
            {themes.map((themeOption) => (
              <button
                key={themeOption}
                onClick={() => handleThemeChange(themeOption)}
                className={`${styles.themeButton} ${
                  theme === themeOption ? styles.active : ""
                }`}
              >
                {themeOption.charAt(0).toUpperCase() + themeOption.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <button onClick={toggleModal} className={styles.closeButton}>
          <IconSquareRoundedX size={24} stroke={2} />
        </button>
      </Modal>
    </div>
  );
}

export default Settings;
