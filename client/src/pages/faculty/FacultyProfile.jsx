import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Divider,
  Grid,
  Typography,
  Chip,
  Stack,
  CircularProgress, // Import CircularProgress
  Container, // Import Container to center the content
} from '@mui/material';

export default function FacultyProfile() {
  // Define state for the faculty data
  const [faculty, setFaculty] = useState(null);

  useEffect(() => {
    // Fetch the faculty data when the component mounts
    const fetchFacultyData = async () => {
      try {
        // Get faculty ID from localStorage
        const facultyId = localStorage.getItem('faculty_id');  // Retrieve faculty_id from localStorage

        if (!facultyId) {
          console.log('Faculty ID is missing!');
          return;
        }

        // Fetch data using the facultyId from the API
        const response = await axios.get(`http://localhost:3000/faculty/profile/${facultyId}`);
        setFaculty(response.data); // Update state with the response data
      } catch (error) {
        console.error('Error fetching faculty data:', error);
      }
    };

    fetchFacultyData();
  }, []); // Empty array means this will run only once when the component mounts

  if (!faculty) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress /> {/* Circular loader centered */}
      </Container>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={4}>
        {/* Left: Profile Card */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', minHeight: 400, display: 'flex', flexDirection: 'column' }}>
            <CardHeader
              avatar={
                <Avatar
                  src={faculty.avatar}
                  sx={{ width: 96, height: 96, mx: 'auto', mb: 2 }}
                >
                  {faculty.name.split(' ').map(n => n[0]).join('')}
                </Avatar>
              }
              title={<Typography align="center" variant="h6">{faculty.name}</Typography>}
              subheader={<Typography align="center" color="text.secondary">{faculty.designation}</Typography>}
            />
            <CardContent sx={{ textAlign: 'left', flexGrow: 1 }}>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>Department</Typography>
              <Typography>{faculty.department}</Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>Email</Typography>
              <Typography>{faculty.email}</Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>Phone</Typography>
              <Typography>{faculty.phone}</Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>Joined</Typography>
              <Typography>{faculty.joined_date}</Typography>
            </CardContent>
            <CardActions>
              <Button fullWidth variant="contained" color="primary">
                Edit Profile
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Right: Info Card */}
        <Grid item xs={12} md={8}>
          <Card sx={{ minHeight: 550, width: 700 }}>
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>Biography</Typography>
              <Typography sx={{ mb: 2 }}>{faculty.bio}</Typography>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" color="primary" gutterBottom>Teaching Areas</Typography>
              <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', mb: 2 }}>
                {faculty.teaching_areas.map((area, i) => (
                  <Chip key={i} label={area} variant="outlined" />
                ))}
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" color="primary" gutterBottom>Research Interests</Typography>
              <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', mb: 2 }}>
                {faculty.research_interests.map((area, i) => (
                  <Chip key={i} label={area} color="secondary" />
                ))}
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" color="primary" gutterBottom>Office Hours</Typography>
              <Grid container spacing={2}>
                {faculty.office_hours.map((slot, i) => (
                  <Grid item xs={6} key={i}>
                    <Box sx={{ bgcolor: '#f5f5f5', p: 2, borderRadius: 2 }}>
                      <Typography fontWeight="medium">{slot.day}</Typography>
                      <Typography>{slot.time}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
