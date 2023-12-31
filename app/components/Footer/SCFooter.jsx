"use client";

import { Box, useTheme, Typography } from "@mui/material";
import DealIcon from "@/app/components/svg/scdealicon.svg";
import DealiciousLogo from "@/app/components/svg/dealiciouslogoNoPadding.svg";

function SCFooter() {
  const theme = useTheme();
  return (

        <Box
            sx={{
                bgcolor: theme.palette.neutral[40],
                color: 'white',
                height: "8rem",
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems:'center',
                m:0,
                p:'0 1rem',
                flexDirection: 'column-reverse',

                '@media screen and (min-width:800px)': {
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    height: "78px",
                },
            }}
        >
            <Box>
                <Box
                    sx={{
                        display: 'flex',
                        flex: 'flex-flow',                        
                        justifyContent: 'center',
                        '@media screen and (min-width:800px)': {
                            justifyContent: 'start',
                        },
                    }}
                >
                    
                    <DealiciousLogo  style={{height:"50", width:"100", color:theme.palette.neutral[80]}}/>
                    
                    
                    {/* <DealIcon /> */}
                    {/* <Typography>dealicious</Typography> */}
                </Box>  
                <Typography variant="p">&copy; 2023{" "} Team Apollo7. All Rights Reserved.</Typography>
            </Box>      
            {/* <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: 5,
                    order:0,
                }}>            
                <Typography>CONTACT US</Typography>
                 <Typography>FAQ</Typography>
                <Typography>PRIVACY POLICY</Typography>
                <Typography>TERMS OF USE</Typography> 
            </Box> */}
        </Box>

  );
}

export default SCFooter;
