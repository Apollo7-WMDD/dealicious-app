import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button, useTheme } from "@mui/material";


const InputTextarea = ({
  label,
  value,
  onChange,
  name,
  id,
  placeholder,
  error,
  type = "text",
  onClick,
  buttonText,
  ...props
}) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        alignItems: "flex-start",
        flexShrink: 0,
        marginBottom: "8px",
        marginTop: "8px",
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
          <Box sx={{
            display: 'flex',
            mb: '1rem',
            alignItems: 'center',
          }}>
            <Typography
              htmlFor={id}
              sx={{
                flexGrow: 1,
                color: "#181818",
                fontSize: "20px",
                fontFamily: "Mukta",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "32px",
              }}
            >
              {label}
            </Typography>
            <Button variant="contained" 
            sx={{
              flexGrow: 0.5,
              fontSize: '20px',
              fontFamily: "Mukta",
              textAlign: 'right',
              boxShadow: 'none',
              fontWeight: 600,
              textDecoration: 'underline',
              color: theme.palette.primary[80],
              justifyContent: 'flex-end',
              // backgroundColor: theme.palette.neutral,
              backgroundColor: theme.palette.neutral[100],
              // borderRadius: '8px',
              // border: `3px solid ${theme.palette.primary[80]}`,
              '&:hover': {
                color: '#FF2D2D',
                boxShadow: 'none',
                backgroundColor: 'transparent',
                // borderColor: '#FF2D2D',
              },
              '@media (max-width: 500px)': {
                width: '100%'
              },
            }}
            onClick={onClick}
            >{buttonText}
            </Button>
          </Box>
        )}
        <TextField
          type={type}
          value={value}
          onChange={onChange}
          name={name}
          id={id}
          placeholder={placeholder}
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          error={!!error}
          helperText={error || ""}
          InputProps={{
            sx: {
              alignItems: "center",
              borderRadius: "8px",
              border: "1px solid #454545",
              background: "#FEFEFE",
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            },
            inputProps: {
              style: {
                color: "#454545",
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

export default InputTextarea;
