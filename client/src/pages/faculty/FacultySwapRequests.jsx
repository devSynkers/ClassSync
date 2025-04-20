import React, { useState } from 'react';
import { Tab, Tabs, Box, Typography, Grid, Card, CardContent, CardHeader } from '@mui/material';
import FacultySwapRequestCard from '../../components/faculty/FacultySwapRequestCard';

export const FacultySwapRequests = () => {
  // Simulate fetching data from the server
  const faculty = {
    id: 1,
    name: 'Dr. John Doe',
  };

  const swapRequests = [
    {
      id: 1,
      fromFaculty: { name: 'Dr. Jane Smith' },
      toFaculty: { name: 'Dr. John Doe' },
      timeSlot: { day: 'Monday', startTime: '09:00', endTime: '10:00' },
      course: { code: 'CS101', name: 'Computer Science 101' },
      room: '101A',
      reason: 'Teaching conflict.',
      dateRequested: '2025-04-19T08:00:00',
      status: 'pending',
    },
    {
      id: 2,
      fromFaculty: { name: 'Dr. Anna Taylor' },
      toFaculty: { name: 'Dr. John Doe' },
      timeSlot: { day: 'Wednesday', startTime: '10:00', endTime: '11:00' },
      course: { code: 'MATH102', name: 'Mathematics 102' },
      room: '202B',
      reason: 'Personal leave.',
      dateRequested: '2025-04-18T10:00:00',
      status: 'accepted',
    },
    // Add more requests as necessary
  ];

  // State to manage the different types of requests
  const [sentRequests] = useState(swapRequests.filter(req => req.fromFaculty.name === faculty.name));
  const [receivedRequests] = useState(swapRequests.filter(req => req.toFaculty.name === faculty.name));
  
  const handleAccept = (request) => {
    console.log('Accepted:', request);
  };
  
  const handleReject = (request) => {
    console.log('Rejected:', request);
  };
  
  const handleMessage = (request) => {
    console.log('Message:', request);
  };

  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>Faculty Swap Requests</Typography>
      
      <Tabs value={0} onChange={() => {}} indicatorColor="primary" textColor="primary">
        <Tab label="Sent Requests" />
        <Tab label="Received Requests" />
      </Tabs>

      <Box sx={{ marginTop: 2 }}>
        <Typography variant="h6" sx={{ marginBottom: 1 }}>
          Sent Requests
        </Typography>
        <Grid container spacing={2}>
          {sentRequests.map(request => (
            <Grid item xs={12} md={6} key={request.id}>
              <FacultySwapRequestCard
                swapRequest={request}
                type="sent"
                onAccept={handleAccept}
                onReject={handleReject}
                onMessage={handleMessage}
              />
            </Grid>
          ))}
        </Grid>

        <Typography variant="h6" sx={{ marginTop: 4, marginBottom: 1 }}>
          Received Requests
        </Typography>
        <Grid container spacing={2}>
          {receivedRequests.map(request => (
            <Grid item xs={12} md={6} key={request.id}>
              <FacultySwapRequestCard
                swapRequest={request}
                type="received"
                onAccept={handleAccept}
                onReject={handleReject}
                onMessage={handleMessage}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};


