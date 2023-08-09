import React, { useState } from 'react';
import { Box, TextField, InputLabel, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const DateDropdown = ({ onChange, value, error }) => {   
  const [startDate, setStartDate] = useState(value ? dayjs(value[0]) : null);  
  const [endDate, setEndDate] = useState(value ? dayjs(value[1]) : null);      
  const tomorrow = dayjs().add(1, 'day');

  const handleStartDateChange = (date) => {
    setStartDate(date);
    const formattedStartDate = date && dayjs(date).isValid() ? date.format('YYYY-MM-DD') : null;
    const formattedEndDate = endDate && dayjs(endDate).isValid() ? endDate.format('YYYY-MM-DD') : null;
    onChange([formattedStartDate, formattedEndDate]);
};

const handleEndDateChange = (date) => {
    setEndDate(date);
    const formattedStartDate = startDate && dayjs(startDate).isValid() ? startDate.format('YYYY-MM-DD') : null;
    const formattedEndDate = date && dayjs(date).isValid() ? date.format('YYYY-MM-DD') : null;
    onChange([formattedStartDate, formattedEndDate]);
};


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{         
        display: 'flex',
        // width: '260px',
        width: '100%',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexShrink: 0, 
        gap: '16px',
        marginTop: '8px',
        marginBottom: '16px'}}
        >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignSelf: 'stretch',
            flex: 1,
          }}
        >
          <InputLabel
            sx={{
              color: '#181818',
              fontSize: '20px',
              fontFamily: 'Mukta',
              fontStyle: 'normal',
              fontWeight: 600,
              // lineHeight: '32px',
            }}
          >
            Start date
          </InputLabel>
          <DatePicker
          sx={{
            alignItems: 'center',
            borderRadius: '8px',
            border: '1px solid #454545',
            background: '#FEFEFE',
            width:'100%',
            height: '44px',
            "& .MuiOutlinedInput-notchedOutline": {
              border: 'none'
            },
            "& .MuiInputBase-input": {  
              padding: '12px 0'  
            },
            "& .MuiInputBase-root": { 
              width:"100%", 
              padding: '0 10px'  
            }
          }}
          minDate={tomorrow}
          value={startDate}
          onChange={handleStartDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
        {error && (
          <Typography variant="body2" color="error" mt={1}>
            {error}
          </Typography>
        )}
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignSelf: 'stretch',
            flex: 1,
          }}
        >
          <InputLabel
            sx={{
              color: '#181818',
              fontSize: '20px',
              fontFamily: 'Mukta',
              fontStyle: 'normal',
              fontWeight: 600,
              // lineHeight: '32px',
            }}
          >
            End date
          </InputLabel>
          <DatePicker
          sx={{
          alignItems: 'center',
          borderRadius: '8px',
          border: '1px solid #454545',
          background: '#FEFEFE',
          width:'100%',
          height: '44px',
          "& .MuiOutlinedInput-notchedOutline": {
              border: 'none'},
          "& .MuiInputBase-input": {  
              padding: '12px 0'  
          },
          "& .MuiInputBase-root": { 
              width:"100%", 
              padding: '0 10px'  
          },
          }}
          minDate={startDate || tomorrow}
          value={endDate}
          onChange={handleEndDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
        {error && (
          <Typography variant="body2" color="error" mt={1}>
            {error}
          </Typography>
        )}
      </Box>
      
    </Box>
        
    </LocalizationProvider>
  );
};

export default DateDropdown;

