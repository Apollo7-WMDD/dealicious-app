import { useState } from "react";
import InputText from "../Input/InputText";
import SubHeader from "../Header/SubHeader";
import SingleButton from "../Button/SingleButton";
import GoogleIcon from "@mui/icons-material/Google";
import { useTheme, Typography, Box, Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import FormLogin from "../Card/FormLogin";
import { signIn } from "next-auth/react";
import SingleButtonNoIcon from "../Button/SingleButtonNoIcon";

function LoginComponent() {
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
    <FormLogin>
      <SubHeader>Login</SubHeader>
      <Box sx={{ margin: 2 }}>
        <InputText
          name="email"
          id="email"
          placeholder="Email or username"
          value={credentials.email}
          onChange={handleChange}
        />
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <InputText
          name="password"
          id="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          type="password"
        />
      </Box>
      <SingleButtonNoIcon text="Log in" onClick={handleLogin} width="326px" />
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
    </FormLogin>
  );
}

export default LoginComponent;
