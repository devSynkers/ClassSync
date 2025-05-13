import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Box, Tabs, Tab, CircularProgress } from '@mui/material';
import TimeTableGrid from '../../components/faculty/TimeTableGrid';
import DelegationForm from '../../components/faculty/DelegationForm';

export const FacultyTimeTable = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [allPeriods, setAllPeriods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState(null);

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const facultyId = localStorage.getItem('faculty_id');
        if (!facultyId) {
          setError('Faculty ID is missing!');
          setLoading(false);
          return;
        }

        const response = await axios.get(`http://localhost:3000/faculty/period/${facultyId}`);
        setAllPeriods(response.data);
      } catch (error) {
        setError('Error fetching timetable');
      } finally {
        setLoading(false);
      }
    };

    fetchTimetable();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  const myClasses = allPeriods;
  const delegatedToMe = []; // You can implement delegation here if needed

  const handleDelegateClick = (period) => {
    setSelectedPeriod(period);
    setDialogOpen(true);
  };

  const handleDelegationSubmit = (data) => {
    console.log("Delegation submitted:", data);
    // handle the submission logic here, like updating the timetable
    setDialogOpen(false);
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
        <Typography>No delegated classes yet.</Typography>
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
