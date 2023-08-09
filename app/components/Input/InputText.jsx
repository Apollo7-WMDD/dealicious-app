import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const InputText = ({
  label,
  value,
  onChange,
  name,
  id,
  placeholder,
  error,
  type = "text",
  marginTop = "8px",
  disabled,
  ...props
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        alignItems: "flex-start",
        flexShrink: 0,
        marginBottom: "8px",
        marginTop,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignSelf: "stretch",
        }}
      >
        {label && (
          <Typography
            htmlFor={id}
            sx={{
              color: disabled ? "gray" : "#181818",  
              fontSize: "20px",
              fontFamily: "Mukta",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "32px",
            }}
          >
            {label}
          </Typography>
        )}
        <TextField
          type={type}
          value={value}
          onChange={onChange}
          name={name}
          id={id}
          placeholder={placeholder}
          variant="outlined"
          fullWidth
          error={!!error}
          helperText={error || ""}
          disabled={disabled}
          InputProps={{
            sx: {
              height: "44px",
              alignItems: "center",
              borderRadius: "8px",
              border: disabled ? "1px solid grey" : "1px solid #454545",  
              background: "#FEFEFE",
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            },
            inputProps: {
              style: {
                color: "#454545",
                // backgroundcolor: "gold !important",
                fontSize: "20px",
                fontFamily: "Mukta",
                fontStyle: "normal",
                fontWeight: 300,
                lineHeight: "28px",
              },
            },
          }}
          {...props}
        />
      </Box>
    </Box>
  );
};

export default InputText;
