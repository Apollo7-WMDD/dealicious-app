import { useState } from "react";
import InputText from "../Input/InputText";
import { useTheme, Typography, Box, Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import FormLogin from "../Card/FormLogin";
import { signIn } from "next-auth/react";
import SingleButtonNoIcon from "../Button/SingleButtonNoIcon";
import Image from "next/image";

function LoginDealicious() {
  const theme = useTheme();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const handleLogin = () => {
    console.log("Login button clicked");
    signIn("credentials", { ...credentials }, { redirect: false });
  };

  const handleLinkClick = (text) => {
    console.log(`${text} clicked`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: `url("/assets/full.svg")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <FormLogin>
        <Typography style={{ fontSize: "3rem" }}>Login</Typography>
        <Box sx={{ width: "80%" }}>
          <InputText
            name="email"
            id="email"
            placeholder="Email or username"
            value={credentials.email}
            onChange={handleChange}
            style={{ minWidth: "64px" }}
          />
        </Box>
        <Box sx={{ marginBottom: "2rem", width: "80%" }}>
          <InputText
            name="password"
            id="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            type="password"
          />
        </Box>
        <SingleButtonNoIcon text="Log in" onClick={handleLogin} width="80%" />
        <Box sx={{ my: 1 }}></Box>
        <Button
          onClick={() => signIn("google")}
          sx={{
            display: "flex",
            height: "44px",
            padding: "12px 24px",
            // marginBottom: "20px",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            borderRadius: "8px",
            color: "black",
            borderColor: "#A9A9A9",
            width: "80% !important",
            minWidth: "64px",
          }}
          variant="outlined"
        >
          <Image
            src="/assets_landingPage/google.svg"
            width="24"
            height="24"
            alt="logo"
          />
          Google
        </Button>
        {/* DEMO USER */}

        <Box
          sx={{
            width: "80%",
            borderRadius: "8px",
            border: "1px solid #A9A9A9",
            padding: "1rem",
            marginTop: "1rem",
          }}
        >
          <Typography variant="p" sx={{ textAlign: "left" }}>
            📌 For demo purpose, please login as: <br />
            <strong>Owner - </strong><br />
            email: pablosmith@hotmail.com <br />
            password: 123456 <br />
            <strong>Customer -</strong><br />
            email: ziyunhunt@hotmail.com <br />
            password: 123456
          </Typography>
        </Box>

        {/* LOGO */}
        <Box
          sx={{
            width: "80%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "2rem",
          }}
        >
          <Image
            src="/assets_landingPage/loginLogo.svg"
            width="110"
            height="110"
            alt="logo"
          />
        </Box>
      </FormLogin>
    </Box>
  );
}

export default LoginDealicious;
