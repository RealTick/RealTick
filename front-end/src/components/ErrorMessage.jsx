import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import styles from "./component_css/Settings.module.css";
import { IconSquareRoundedX } from "@tabler/icons-react";
import { IconAlertTriangle } from "@tabler/icons-react";

Modal.setAppElement("#root");

function ErrorMessage({ error, onModalClose }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(!!error);
  }, [error]);

  const closeModal = () => {
    setIsModalOpen(false);
    if (onModalClose) {
      onModalClose();
    }
  };

  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className={styles.modal}
        overlayClassName={styles.eoverlay} //settings.module.css cause redundant
      >
        <button onClick={closeModal} className={styles.closeButton}>
          <IconSquareRoundedX size={24} stroke={2} />
        </button>
        <div style={{ color: "red", fontWeight: "bold", fontSize: "18px" }}>
          <IconAlertTriangle size={24} stroke={2} />
          &nbsp; {error} &nbsp;
          <IconAlertTriangle size={24} stroke={2} />
        </div>
      </Modal>
    </div>
  );
}

export default ErrorMessage;
