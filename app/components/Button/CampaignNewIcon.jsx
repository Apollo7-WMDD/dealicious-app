"use client";

import PriceTag from "@/app/components/svg/dealIcon_priceTag.svg";
import Plus from "@/app/components/svg/dealIcon_plus.svg";
import "./ButtonCampaign.css";

const CampaignNewIcon = () => {
  return (
    <div
      className="svg-icon"
      style={{
        position: "relative",
        display: "flex",
      }}
    >
      <PriceTag style={{ height: "50px", width: "50px" }} />
      <Plus
        style={{
          position: "absolute",
          bottom: "8px",
          left: "3px",
          height: "20px",
          width: "20px",
        }}
        className="svg-plus-icon"
      />
    </div>
  );
};

export default CampaignNewIcon;
