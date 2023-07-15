import React from 'react';
import ChartCard from '../Card/ChartCard'; 
import InputText from '../Input/InputText';
import SubHeader from '../Header/SubHeader';
import SingleButton from '../Button/SingleButton';
import GoogleIcon from '@mui/icons-material/Google';
import { useTheme, Typography, Box, Button } from '@mui/material';
import Divider from '@mui/material/Divider';
import Form from '../Card/Form';
import { signIn } from "next-auth/react";

// import ChartCard from "../ChartCard";
// import InputText from "../Input/InputText";
// import SubHeader from "../Header/SubHeader";
// import SingleButton from "../Button/SingleButton";
// import GoogleIcon from "@mui/icons-material/Google";
// import { useTheme, Typography, Box, Button } from "@mui/material";
// import Divider from "@mui/material/Divider";
// import Form from "../Card/Form";

// import { signIn } from "next-auth/react";

function LoginComponent() {
  const theme = useTheme();
  const handleLogin = () => {
    console.log("Login button clicked");
  };

  const handleLinkClick = (text) => {
    console.log(`${text} clicked`);
  };

  return (
    <Form>
      <SubHeader>Login</SubHeader>
      <Box sx={{ margin: 2 }}>
        <InputText
          name="email"
          id="email"
          // value={}
          // onChange={}
          placeholder="Email or username"
        />
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <InputText
          name="password"
          id="password"
          // value={}
          // onChange={}
          placeholder="Password"
        />
      </Box>
      <SingleButton text="Log in" onClick={handleLogin} width="326px" />
      <Typography
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 10,
          margin: 1,
        }}
      >
        <Button
          onClick={() => handleLinkClick("Get login link")}
          sx={{ cursor: "pointer", fontSize: "14px", textTransform: "none" }}
        >
          Get login link
        </Button>
        <Button
          onClick={() => handleLinkClick("Reset password")}
          sx={{ cursor: "pointer", fontSize: "14px", textTransform: "none" }}
        >
          Reset password
        </Button>
      </Typography>
      <Box sx={{ my: 2 }}>
        <Divider>OR</Divider>
      </Box>
      <Button
        onClick={() => signIn("google")}
        sx={{
          display: "flex",
          height: "44px",
          width: "326px",
          padding: "12px 24px",
          marginBottom: "20px",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
          borderRadius: "8px",
          color: "black",
          borderColor: "#A9A9A9",
        }}
        variant="outlined"
      >
        <GoogleIcon />
        Google
      </Button>
    </Form>
  );
}

export default LoginComponent;
