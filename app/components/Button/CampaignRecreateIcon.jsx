import PriceTag from "@/app/components/svg/dealIcon_priceTag_empty.svg";
import Arrow from "@/app/components/svg/dealIcon_arrow.svg";

import styles from "./ButtonCampaign.module.css";

const CampaignRecreateIcon = () => {
  return (
    <div
      className={styles.svg_icon_2}
      style={{
        position: "relative",
        display: "flex",
        marginRight: "0.25rem",
        marginTop: "0.25rem",
        marginBottom: "0.25rem",
      }}
    >
      <PriceTag style={{ height: "37px", width: "37px" }} />
      <Arrow
        style={{
          position: "absolute",
          bottom: "0px",
          left: "2px",
          height: "35px",
          width: "35px",
        }}
        className={styles.svg_arrow_icon}
      />
    </div>
  );
};

export default CampaignRecreateIcon;
