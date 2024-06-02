// DateRangePicker.jsx
import React, { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box, TextField } from '@mui/material';

const DateRangePicker = ({ dateRange, onDateRangeChange }) => {
  const [startDate, setStartDate] = useState(dateRange.start);
  const [endDate, setEndDate] = useState(dateRange.end);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    onDateRangeChange({ start: date, end: endDate });
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    onDateRangeChange({ start: startDate, end: date });
  };

  return (
    <Box display="flex" gap={2}>
      <DatePicker
        label="Start Date"
        value={startDate}
        onChange={handleStartDateChange}
        renderInput={(params) => <TextField {...params} />}
      />
      <DatePicker
        label="End Date"
        value={endDate}
        onChange={handleEndDateChange}
        renderInput={(params) => <TextField {...params} />}
      />
    </Box>
  );
};

export default DateRangePicker;