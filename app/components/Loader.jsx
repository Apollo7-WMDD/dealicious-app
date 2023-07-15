"use client";

import Image from "next/image";

const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <Image
        src="/assets/SpinnerLoader.gif"
        alt="loading"
        width={200}
        height={200}
      />
    </div>
  );
};

export default Loader;
