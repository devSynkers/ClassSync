// TimeTable.jsx
import React, { useState } from 'react';
import { Typography, Box, Button, Tabs, Tab } from '@mui/material';
import TimeTableGrid from '../../components/faculty/TimeTableGrid';
import DelegationForm from '../../components/faculty/DelegationForm';

export const FacultyTimeTable = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const currentFacultyId = 'f1'; // Simulated logged-in faculty

  const allPeriods = [
    {
      id: 'p1',
      courseCode: 'CS101',
      courseName: 'Intro to CS',
      room: '101',
      day: 'Monday',
      time: '09:00-10:00',
      facultyId: 'f1',
      isDelegated: false,
    },
    {
      id: 'p2',
      courseCode: 'MTH102',
      courseName: 'Calculus I',
      room: '202',
      day: 'Tuesday',
      time: '10:00-11:00',
      facultyId: 'f1',
      isDelegated: true,
      delegationStatus: 'pending',
      delegatedToId: 'f2',
      delegatedToName: 'Dr. Smith',
    },
    {
      id: 'p3',
      courseCode: 'PHY105',
      courseName: 'Mechanics',
      room: '105',
      day: 'Friday',
      time: '11:15-12:15',
      facultyId: 'f2',
      isDelegated: true,
      delegationStatus: 'accepted',
      delegatedToId: 'f1',
      delegatedToName: 'You',
    },
  ];

  const myClasses = allPeriods.filter(p => p.facultyId === currentFacultyId);
  const delegatedToMe = allPeriods.filter(p => p.delegatedToId === currentFacultyId);

  const handleDelegateClick = (period) => {
    setSelectedPeriod(period);
    setDialogOpen(true);
  };

  const handleDelegationSubmit = (data) => {
    console.log("Delegation submitted:", data);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>My Timetable</Typography>
      <Typography variant="body1" gutterBottom>
        View and manage your teaching schedule.
      </Typography>

      <Tabs value={activeTab} onChange={(e, newVal) => setActiveTab(newVal)} sx={{ mb: 2 }}>
        <Tab label="My Classes" />
        <Tab label="Delegated to Me" />
      </Tabs>

      {activeTab === 0 ? (
        <TimeTableGrid periods={myClasses} onDelegateClick={handleDelegateClick} />
      ) : (
        <TimeTableGrid periods={delegatedToMe} onDelegateClick={() => {}} />
      )}

      <DelegationForm
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        period={selectedPeriod}
        onSubmit={handleDelegationSubmit}
      />
    </Box>
  );
};


