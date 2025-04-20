import { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
  Grid,
} from "@mui/material";
import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format } from "date-fns";

// Sample static meeting data
const meetings = [
  {
    id: "meeting-1",
    title: "Department Strategy Meeting",
    date: "2025-04-20",
    startTime: "10:00 AM",
    endTime: "11:30 AM",
    location: "Conference Room A",
    description: "Discuss quarterly goals and faculty planning.",
    attendees: ["Dr. Sharma", "Prof. Kapoor", "Ms. Lobo"],
  },
  {
    id: "meeting-2",
    title: "Student Research Review",
    date: "2025-04-20",
    startTime: "2:00 PM",
    endTime: "3:00 PM",
    location: "Lab 3",
    description: "Presentation of research progress by final-year students.",
    attendees: ["Dr. Mehra", "Prof. Singh"],
  },
  {
    id: "meeting-3",
    title: "No Attendees Example",
    date: "2025-04-20",
    startTime: "4:00 PM",
    endTime: "5:00 PM",
    location: "Room B",
    description: "Testing fallback rendering.",
    attendees: 0, // <- would previously break, now handled
  },
];

export default function MeetingSchedules() {
  const [selectedDate, setSelectedDate] = useState(new Date());

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
                          <Button variant="outlined" size="small" color="primary">
                            RSVP
                          </Button>
                          <Button variant="text" size="small" color="error">
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
    </Box>
  );
}
