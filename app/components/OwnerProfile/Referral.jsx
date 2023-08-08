import ChartCard from "../Card/ChartCard";
import SubHeader from "../Header/SubHeader";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import Typography from "@mui/material/Typography";
import QRCode from "qrcode";
import { useState, useEffect } from "react";
import { fetchReferralSystem } from "@/lib/fetching/profile/data";
import SingleButtonNoIcon from "../Button/SingleButtonNoIcon";
import Declarationmark from "../svg/declarationmark.svg";

function Referral({ restaurantOwnerId, data }) {
  const [restaurantData, setRestaurantData] = useState(null);
  const [qrCodeURL, setQrCodeURL] = useState(null);
  const theme = useTheme();
  const shadowColor = `${theme.palette.neutral[20]}1f`;
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const getRestaurantData = async () => {
      const restaurantData = data;
      // const data = await fetchReferralSystem(restaurantOwnerId);
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
    const link = document.createElement("a");
    link.download = "qrcode.png";
    link.href = qrCodeURL;
    link.click();
  };

  return (
    <Box
      sx={{
        gridColumn: "1/3",
        boxShadow: `0px 4px 20px 0px ${shadowColor}`,
        borderRadius: "8px",
        display: "flex",
        padding: "16px 24px",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        flexShrink: 0,
        gap: "1rem",
        height: "100%",
        [theme.breakpoints.down("md")]: {
          gridColumn: "1/-1",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <SubHeader>Referral System</SubHeader>
        {isMobile && (
                <>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            marginBottom: '1rem'
                        }}
                    >
                        <img
                            src={qrCodeURL}
                            alt="QR Code"
                            sx={{
                                width: '320px',
                                height: '320px',
                                marginBottom: '1rem'
                            }}
                        />
                        <SingleButtonNoIcon
                            variant="outlined"
                            text="Print Code"
                            onClick={printCode}
                        />
                    </Box>
                    
                    <Typography
                        sx={{
                            marginTop: "18px",
                            fontSize: "18px",
                            fontWeight: "300",
                            textAlign: 'left',
                        }}
                    >
                        The Super Customers can earn
                        {restaurantData
                            ? ` ${restaurantData.superCustomerPoints}`
                            : null}{" "}
                        points for each hundred dollars they spend at your business. They can
                        redeem their points to get $1.00 discount per point.
                    </Typography>
                </>
            )}

            {!isMobile && (
                <>
                    <Typography
                        sx={{
                            marginTop: "18px",
                            fontSize: "18px",
                            fontWeight: "300"
                        }}
                    >
                        The Super Customers can earn
                        {restaurantData
                            ? ` ${restaurantData.superCustomerPoints}`
                            : null}{" "}
                        points for each hundred dollars they spend at your business. They can
                        redeem their points to get $1.00 discount per point.
                    </Typography>
                    
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: 'row',
                            justifyContent: "space-between",
                            marginTop: "40px",
                            "& img": {
                                maxWidth: "100px"
                            },
                        }}
                    >
                        <img src={qrCodeURL} alt="QR Code" />
                        <SingleButtonNoIcon
                            variant="outlined"
                            text="Print Code"
                            onClick={printCode}
                        />
                    </Box>
                </>
            )}

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "end",
                    alignItems: "center",
                    marginTop: "25px",
                    gap: "8px",
                }}
            >
                <Declarationmark />
                <Typography
                    sx={{
                        color: "#FF5938",
                        fontSize: "16px",
                        fontWeight: "600",
                    }}
                >
                    Learn about pointing & referral
                </Typography>
            </Box>
        </Box>
    </Box>
  );
}

export default Referral;
