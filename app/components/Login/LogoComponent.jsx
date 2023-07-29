"use client";

import Logo from "@/app/components/svg/dealicious_logo.svg";
import styles from "./LogoComponent.module.css";

const LogoComponent = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        width: "100vw",
      }}
    >
      <div className={styles.logo}>
        <Logo style={{ height: "auto", width: "50vw" }} />
      </div>
    </div>
  );
};

export default LogoComponent;
