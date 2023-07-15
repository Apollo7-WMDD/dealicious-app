import React, { useState } from 'react';
import { Box, TextField, InputLabel } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const DateDropdown = ({ onChange }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const tomorrow = dayjs().add(1, 'day');

  const handleStartDateChange = (date) => {
    setStartDate(date);
    onChange([date, endDate]);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    onChange([startDate, date]);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{         
        display: 'flex',
        // width: '260px',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'flex-start',
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
            }
          }}
          minDate={tomorrow}
          value={startDate}
          onChange={handleStartDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignSelf: 'stretch',
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
              border: 'none'
            }
          }}
          value={endDate}
          onChange={handleEndDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </Box>
    </Box>
        
    </LocalizationProvider>
  );
};

export default DateDropdown;
