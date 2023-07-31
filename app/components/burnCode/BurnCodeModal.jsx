import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Box, Typography, TextField, IconButton } from "@mui/material";
import SingleButtonNoIcon from "../Button/SingleButtonNoIcon";
import CloseModal from "./CloseModal";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function BurnCodeModal({
  openModal,
  setOpenModal,
  restaurantId,
  campaignCode,
  setRender,
}) {
  const [amount, setAmount] = React.useState("");

  console.log("campaignCode: ", campaignCode);

  const handleClose = async () => {
    setOpenModal(false);
    const burnCodeInfo = {
      username: campaignCode.username,
      campaignname: campaignCode.campaignname,
      restaurantId: campaignCode.restaurantId,
      billamount: amount,
    };

    try {
      const res = await fetch(
        `/api/burnCode/add_points/${campaignCode.campaignId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(burnCodeInfo),
        }
      );
      if (!res.ok) {
        const data = await res.text();
        throw new Error(data);
      } else {
        const data = await res.json();
        console.log("Success! ", data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setAmount("");
    }

    try {
      // update the burned status
      const res = await fetch(
        `/api/burnCode/add_points/${campaignCode.campaignId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ burnCodeId: campaignCode.id }),
        }
      );
      if (!res.ok) {
        const data = await res.text();
        throw new Error(data);
      } else {
        const data = await res.json();
        console.log("Success! ", data);
        setRender();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    setAmount(event.target.value);
  };

  return (
    <div>
      <Dialog
        open={openModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{ style: { borderRadius: "12px" } }}
      >
        <Box
          sx={{
            padding: "0 0 2rem 1rem",
          }}
        >
          <DialogTitle>
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                marginBottom: "1rem",
              }}
            >
              <IconButton
                color="primary"
                aria-label="close"
                onClick={handleClose}
              >
                <CloseModal />
              </IconButton>
            </div>
            <Typography variant="h2" sx={{ fontWeight: "bold", p: "0" }}>
              Burned Successfully
            </Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <Typography
                variant="p"
                color="text.primary"
                sx={{ fontSize: "20px", p: "0" }}
              >
                The customer is eligible to get a discount/promo on the selected
                item at the restaurant.
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "start",
              padding: "0 1.25rem",
            }}
          >
            <Typography
              variant="p"
              color="text.primary"
              sx={{ fontSize: "20px", fontWeight: "bold" }}
            >
              Please enter the total amount of the receipt
            </Typography>
            <TextField
              id="outlined-basic"
              variant="outlined"
              placeholder="Total Amount"
              size="small"
              type="number"
              margin="dense"
              onChange={handleChange}
              value={amount}
              fullWidth
              sx={{
                marginBottom: "1.75rem",
              }}
            />
            <SingleButtonNoIcon
              text={"Submit"}
              width={"116px"}
              onClick={handleClose}
            />
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}
