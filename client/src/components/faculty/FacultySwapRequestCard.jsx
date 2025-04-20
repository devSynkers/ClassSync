import React from 'react';
import { Card, CardContent, CardHeader, Typography, Button } from '@mui/material';

const FacultySwapRequestCard = ({ swapRequest, type, onAccept, onReject, onMessage }) => {
  const { fromFaculty, toFaculty, timeSlot, course, room, reason, dateRequested, status } = swapRequest;

  return (
    <Card>
      {/* Card Header - Title */}
      <CardHeader 
        title={`Swap Request from ${fromFaculty.name} to ${toFaculty.name}`} 
        subheader={new Date(dateRequested).toLocaleDateString()} 
      />
      <CardContent>
        <div>
          <Typography variant="body2" color="textSecondary">
            <strong>Course:</strong> {course.name} ({course.code})
          </Typography>
        </div>
        <div>
          <Typography variant="body2" color="textSecondary">
            <strong>Time:</strong> {timeSlot.day}, {timeSlot.startTime} - {timeSlot.endTime}
          </Typography>
        </div>
        <div>
          <Typography variant="body2" color="textSecondary">
            <strong>Room:</strong> {room}
          </Typography>
        </div>
        <div>
          <Typography variant="body2" color="textSecondary">
            <strong>Reason:</strong> {reason}
          </Typography>
        </div>
        <div>
          <Typography variant="body2" color="textSecondary">
            <strong>Status:</strong> {status}
          </Typography>
        </div>

        <div>
          <Typography variant="body2" color="textSecondary">
            <strong>Requested on:</strong> {new Date(dateRequested).toLocaleDateString()}
          </Typography>
        </div>

        <div style={{ marginTop: '10px' }}>
          {type === 'sent' && (
            <Button variant="contained" color="primary" onClick={() => onMessage(swapRequest)}>
              Message
            </Button>
          )}

          {type === 'received' && (
            <>
              <Button variant="outlined" color="error" onClick={() => onReject(swapRequest)}>
                Reject
              </Button>
              <Button variant="contained" color="primary" onClick={() => onAccept(swapRequest)}>
                Accept
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Default export for the component
export default FacultySwapRequestCard;
