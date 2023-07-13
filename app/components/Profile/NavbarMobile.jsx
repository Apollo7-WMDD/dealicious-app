import { useState } from 'react';
import { Box, Tab, Tabs, useTheme } from '@mui/material';

const NavbarMobile = ({value, setValue}) => {
  const theme = useTheme();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: { xs: 'block', sm: 'none' }, marginBottom:'17px' }}>
      <Tabs value={value} onChange={handleChange} textColor="primary" centered
            sx={{ '& .MuiTabs-indicator': { backgroundColor: theme.palette.primary[80] } }}
      >
        <Tab label="Information" sx={{ fontFamily: 'Mukta', fontSize: '16px', fontStyle: 'normal', fontWeight: 600, lineHeight: '32px' }} />
        <Tab label="Hours & Images" sx={{ fontFamily: 'Mukta', fontSize: '16px', fontStyle: 'normal', fontWeight: 600, lineHeight: '32px' }} />
        <Tab label="Referral System" sx={{ fontFamily: 'Mukta', fontSize: '16px', fontStyle: 'normal', fontWeight: 600, lineHeight: '32px' }} />
      </Tabs>
    </Box>
  );
};

export default NavbarMobile;
