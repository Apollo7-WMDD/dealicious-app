"use client";

import { Box, useTheme, Typography } from "@mui/material";
import DealIcon from "@/app/components/svg/scdealicon.svg";

function SCFooter() {
  const theme = useTheme();
  return (

        <Box
            sx={{
                bgcolor: '#474747',//theme.palette.primary[60],
                color: 'white',
                height: "78px",
                display: 'flex',
                justifyContent: 'space-between',
                alignItems:'center',
                m:0,
                p:'0 1rem',
                flexDirection: 'column-reverse',

                '@media screen and (min-width:800px)': {
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
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
                    <DealIcon />
                    <Typography>dealicious</Typography>
                </Box>  
                <Typography variant="p">&copy; 2023{" "} Team Apollo7. All Rights Reserved.</Typography>
            </Box>      
            <Box
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
            </Box>
        </Box>

  );
}

export default SCFooter;
