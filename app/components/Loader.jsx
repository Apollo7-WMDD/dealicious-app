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
        src="/assets/Loading-100px.gif"
        alt="loading"
        width={100}
        height={100}
      />
    </div>
  );
};

export default Loader;
