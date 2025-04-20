// TimeTableGrid.jsx
import React from 'react';
import { Box, Typography, Paper, Button, Chip } from '@mui/material';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const timeSlots = ['09:00-10:00', '10:00-11:00', '11:15-12:15', '12:15-13:15', '14:00-15:00'];

const TimeTableGrid = ({ periods, onDelegateClick }) => {
  const getCellContent = (day, time) => {
    const match = periods.find(p => p.day === day && p.time === time);
    if (!match) return null;

    return (
      <Paper elevation={2} sx={{ p: 1.5, minHeight: 100 }}>
        <Typography variant="subtitle2">{match.courseCode}</Typography>
        <Typography variant="body2" color="textSecondary">{match.courseName}</Typography>
        <Typography variant="caption">Room: {match.room}</Typography>

        {match.isDelegated ? (
          <Box mt={1}>
            <Chip 
              size="small" 
              label={match.delegationStatus === 'pending' ? 'Delegation Pending' : 'Delegated'} 
              color={match.delegationStatus === 'pending' ? 'warning' : 'primary'}
            />
            {match.delegatedToName && (
              <Typography variant="caption" display="block">{match.delegatedToName}</Typography>
            )}
          </Box>
        ) : (
          <Button 
            variant="outlined" 
            size="small" 
            onClick={() => onDelegateClick(match)} 
            sx={{ mt: 1 }}
          >
            Delegate
          </Button>
        )}
      </Paper>
    );
  };

  return (
    <Box display="grid" gridTemplateColumns={`repeat(${days.length + 1}, 1fr)`} gap={1}>
      <Box />
      {days.map(day => (
        <Typography key={day} align="center" fontWeight="bold">{day}</Typography>
      ))}

      {timeSlots.map(time => (
        <React.Fragment key={time}>
          <Typography fontWeight="bold" align="center">{time}</Typography>
          {days.map(day => (
            <Box key={`${day}-${time}`}>
              {getCellContent(day, time)}
            </Box>
          ))}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default TimeTableGrid;
