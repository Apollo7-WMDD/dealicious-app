"use client";

import PriceTag from "@/app/components/svg/dealIcon_priceTag.svg";
import styles from "./ButtonCampaign.module.css";

const CampaignSCIcon = () => {
  return (
    <div
      className={styles.svg_icon}
      style={{
        position: "relative",
        display: "flex",
      }}
    >
      <PriceTag style={{ height: "50px", width: "50px" }} />
    </div>
  );
};

export default CampaignSCIcon;
