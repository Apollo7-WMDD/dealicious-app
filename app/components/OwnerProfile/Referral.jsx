import ChartCard from "../Card/ChartCard";
import SubHeader from "../Header/SubHeader";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import QRCode from "qrcode";
import { useState, useEffect } from "react";
import LoaderSkeleton from "./Loader/LoaderSkeleton";
import { fetchReferralSystem } from "@/lib/fetching/profile/data";
import SingleButtonNoIcon from "../Button/SingleButtonNoIcon";

function Referral({ restaurantOwnerId }) {
  const [restaurantData, setRestaurantData] = useState(null);
  const [qrCodeURL, setQrCodeURL] = useState(null);

  useEffect(() => {
    const getRestaurantData = async () => {
      const data = await fetchReferralSystem(restaurantOwnerId);
      const { restaurantInfo } = data;
      setRestaurantData(restaurantInfo);

      if (restaurantInfo.qrCode) {
        const url = await QRCode.toDataURL(restaurantInfo.qrCode);
        setQrCodeURL(url);
      }
    };

    getRestaurantData();
  }, [restaurantOwnerId]);

  const printCode = () => {
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = qrCodeURL;
    link.click();
  }

  return (
    <ChartCard content="Referral System" gridColumn="1 / 3">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <SubHeader>Referral System</SubHeader>
        <Typography>
          The Super Customers can earn 
          {restaurantData ? `$${restaurantData.superCustomerPoints}` : <LoaderSkeleton />} points for each hundred dollars they spend at your business. They can redeem their points to get $1.00 discount per point.
        </Typography>
        <Typography>
          {qrCodeURL ? <img src={qrCodeURL} alt="QR Code" /> : <LoaderSkeleton />}
        </Typography>
        <SingleButtonNoIcon variant="outlined" text="Print Code" onClick={printCode}/>
      </Box>
    </ChartCard>
  );
}

export default Referral;
