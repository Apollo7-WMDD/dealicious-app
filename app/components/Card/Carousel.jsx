import React from "react";
import { styled } from "@mui/system";

const Carousel = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
//   alignItems: 'start', 
  overflowX: 'auto',
  scrollbarWidth: 'none', 
  '&::-webkit-scrollbar': {
    display: 'none', 
  },
  '& > *': {
    marginRight: '20px', 
    maxWidth: '350px',
  },
  '& > *:last-child': {
    marginRight: '0px', 
  },
  padding: '20px',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'column',
    overflowX: 'visible',
    '& > *': {
      marginRight: '0px',
      marginBottom: '20px',
      maxWidth: '100%',
    },
    '& > *:last-child': {
      marginBottom: '0px',
    },
  },
}));

export default Carousel;
