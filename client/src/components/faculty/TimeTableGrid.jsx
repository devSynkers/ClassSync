// TimeTableGrid.jsx
import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const timeSlots = [
  '08:30-09:20',
  '09:25-10:15',
  '10:30-11:20',
  '11:25-12:15',
  '13:10-14:00',
  '14:05-14:55',
  '15:00-15:50',
  '15:55-16:45',
];

const TimeTableGrid = ({ periods }) => {
  const getCellContent = (day, time) => {
    const match = periods.find(p => p.day === day && p.time_slot === time);
    if (!match) return null;

    return (
      <Paper elevation={0} sx={{ p: 1, minHeight: 100 }}>
        <Typography variant="subtitle2">{match.course_code}</Typography>
        <Typography variant="body2" color="textSecondary">{match.course_name}</Typography>
        <Typography variant="caption">Room: {match.room}</Typography>
      </Paper>
    );
  };

  return (
    <Box display="grid" gridTemplateColumns={`repeat(${days.length + 1}, 1fr)`} gap={0}>
      <Box
        sx={{
          border: '1px solid #ccc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f5f5f5',
          fontWeight: 'bold',
          height: 60,
        }}
      >
        Time / Day
      </Box>
      {days.map(day => (
        <Box
          key={day}
          sx={{
            border: '1px solid #ccc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f5f5f5',
            fontWeight: 'bold',
            height: 60,
          }}
        >
          {day}
        </Box>
      ))}

      {timeSlots.map(time => (
        <React.Fragment key={time}>
          <Box
            sx={{
              border: '1px solid #ccc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              height: 100,
              textAlign: 'center',
            }}
          >
            {time}
          </Box>
          {days.map(day => (
            <Box
              key={`${day}-${time}`}
              sx={{
                border: '1px solid #ccc',
                minHeight: 100,
                p: 1,
              }}
            >
              {getCellContent(day, time)}
            </Box>
          ))}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default TimeTableGrid;
