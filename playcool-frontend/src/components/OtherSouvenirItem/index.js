import React, { Suspense } from "react";
import { IconButton } from "@mui/material";
import styles from "./OtherSouvenirItem.module.css";

const OtherSouvenirItem = ({ imagePath, site }) => {
  const handleBuyClick = () => {
    window.location.href = site;
  };

  return (
    <div className={styles.OtherSouvenirItem}>
      <img
        src="/drag-right-white.gif"
        alt="Drag Right"
        className={styles.dragIcon}
      />
      <div
        className={styles.OtherSouvenirCanvas}
        style={{ width: "600px", height: "300px" }}
      >
        <img
          src={imagePath}
          alt="Souvenir"
          style={{ maxWidth: "80%", height: "80%" }}
        />
      </div>
      <div className={styles.OtherSouvenirDescription}>
        <h3 className={styles.OtherSouvenirNav} onClick={handleBuyClick}>
          Click to check it out !
        </h3>
        <p>Perfect souvenir for fans from the concerts.</p>
      </div>
    </div>
  );
};

export default OtherSouvenirItem;
