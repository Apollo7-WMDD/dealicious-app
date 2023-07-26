import DealIcon from "@/app/components/svg/dealIcon.svg";
import "./ButtonCampaign.css";

const style = {
  display: "flex",
  animation:
    "rotateAnimation 1s infinite alternate cubic-bezier(0.25, 0.1, 0.25, 1)",
};

const ButtonCampaignNew = () => {
  return (
    <div style={style}>
      <DealIcon />
    </div>
  );
};

export default ButtonCampaignNew;
