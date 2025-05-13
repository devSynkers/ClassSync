import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
  Grid,
  Snackbar,
  Alert
} from "@mui/material";
import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format } from "date-fns";

export default function FacultyMeetings() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [meetings, setMeetings] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // 'success' or 'error'
  const facultyName = "Riyas Sudheen"; // Example faculty name (this can be dynamic)

  // Fetch meetings when the component mounts
  useEffect(() => {
    fetchMeetings();
  }, [selectedDate]);

  const fetchMeetings = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/faculty/meeting/${facultyName}`
      );
      const data = await response.json();
      setMeetings(data);
    } catch (error) {
      console.error("Error fetching meetings:", error);
    }
  };

  const handleRSVP = async (meetingId, status) => {
    try {
      const response = await fetch("http://localhost:3000/faculty/meeting/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          meetingId,
          facultyName,
          status,
        }),
      });

      const data = await response.json();
      if (data.message) {
        setSnackbarMessage(`RSVP ${status === 'RSVP' ? 'confirmed' : 'declined'} successfully!`);
        setSnackbarSeverity("success"); // Success notification
        fetchMeetings(); // Refresh meetings after RSVP
      } else {
        setSnackbarMessage("Failed to submit RSVP");
        setSnackbarSeverity("error"); // Error notification
      }
    } catch (error) {
      console.error("Error submitting RSVP:", error);
      setSnackbarMessage("Failed to submit RSVP");
      setSnackbarSeverity("error"); // Error notification
    }
    setSnackbarOpen(true); // Open the snackbar
  };

  const filteredMeetings = selectedDate
    ? meetings.filter((meeting) => {
        const meetingDate = new Date(meeting.date);
        return (
          meetingDate.getDate() === selectedDate.getDate() &&
          meetingDate.getMonth() === selectedDate.getMonth() &&
          meetingDate.getFullYear() === selectedDate.getFullYear()
        );
      })
    : [];

  // Close Snackbar handler
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Meeting Schedule
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateCalendar
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              sx={{ border: 1, borderColor: "divider", borderRadius: 2, p: 2 }}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card variant="outlined" sx={{ height: "100%" }}>
            <CardContent>
              {selectedDate && (
                <Typography variant="h6" gutterBottom>
                  {format(selectedDate, "EEEE, MMMM d, yyyy")}
                </Typography>
              )}

              {filteredMeetings.length === 0 ? (
                <Typography color="text.secondary" align="center" sx={{ mt: 4 }}>
                  No meetings scheduled for this day
                </Typography>
              ) : (
                <Box display="grid" gap={2}>
                  {filteredMeetings.map((meeting) => (
                    <Card key={meeting.id} variant="outlined">
                      <CardContent>
                        <Box display="flex" justifyContent="space-between">
                          <Typography variant="subtitle1" color="primary">
                            {meeting.title}
                          </Typography>
                          <Typography variant="body2" fontWeight={500}>
                            {meeting.startTime} - {meeting.endTime}
                          </Typography>
                        </Box>

                        <Typography variant="body2" color="text.secondary" mt={1}>
                          <strong>Location:</strong> {meeting.location}
                        </Typography>
                        <Typography variant="body2" mt={1}>
                          {meeting.description}
                        </Typography>

                        <Box mt={2}>
                          <Typography variant="caption" color="text.secondary" fontWeight={500}>
                            Attendees
                          </Typography>
                          <Box mt={0.5} display="flex" flexWrap="wrap" gap={1}>
                            {Array.isArray(meeting.attendees) && meeting.attendees.length > 0 ? (
                              meeting.attendees.map((attendee, index) => (
                                <Chip key={index} label={attendee} size="small" />
                              ))
                            ) : (
                              <Chip
                                label="No attendees listed"
                                size="small"
                                variant="outlined"
                              />
                            )}
                          </Box>
                        </Box>

                        <Box mt={3} display="flex" justifyContent="flex-end" gap={1}>
                          <Button
                            variant="outlined"
                            size="small"
                            color="primary"
                            onClick={() => handleRSVP(meeting.id, "RSVP")}
                          >
                            RSVP
                          </Button>
                          <Button
                            variant="text"
                            size="small"
                            color="error"
                            onClick={() => handleRSVP(meeting.id, "Declined")}
                          >
                            Decline
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Snackbar Notification */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
