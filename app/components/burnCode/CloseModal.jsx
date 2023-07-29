"use client";
import Close from "@/app/components/svg/closeButton.svg";

const CloseModal = () => {
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <Close style={{ height: "22px", width: "22px" }} />
    </div>
  );
};

export default CloseModal;
