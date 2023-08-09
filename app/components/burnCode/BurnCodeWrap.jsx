"use client";

import { useStore } from "@/lib/context/user_context/store";
import { fetchUserCodes } from "@/lib/fetching/burncode/data";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Loader from "../Loader";
import BurnCodeCard from "./BurnCodeCard";
import BurnCodeModal from "./BurnCodeModal";

function BurnCodeWrap({ render, setRender }) {
  const { restaurantId } = useStore();
  const [data, setData] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [campaignCode, setCampaignCode] = useState({});
  const handleRenderUpdate = () => {
    setRender((prevRender) => prevRender + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (restaurantId) {
        // Check if restaurantId is defined
        const result = await fetchUserCodes(restaurantId);
        setData(result);
      }
    };
    fetchData();
  }, [render, restaurantId]);

  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr",
          m: "0 1rem",
          p: "1rem",
          gap: "1rem",
          overflow: "auto",
          "@media screen and (min-width:900px)": {
            gridTemplateColumns: "1fr 1fr",
          },
          "@media screen and (min-width:1300px)": {
            gridTemplateColumns: "1fr 1fr 1fr",
          },
        }}
      >
        {data?.burncodes?.length === 0 && (
          <Box>
            <Typography variant="h5">No request at this moment</Typography>
          </Box>
        )}

        {!data?.burncodes ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <Loader />
          </div>
        ) : (
          data?.burncodes?.map((item, index) => {
            return (
              <BurnCodeCard
                key={index}
                props={item}
                setOpenModal={setOpenModal}
                setCampaignCode={setCampaignCode}
              />
            );
          })
        )}
      </Box>
      <BurnCodeModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        restaurantId={restaurantId}
        campaignCode={campaignCode}
        setRender={handleRenderUpdate}
      />
    </>
  );
}

export default BurnCodeWrap;
