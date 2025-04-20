import { Box, Typography, Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";

export function FacultyTimeTable() {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const timeRanges = [
    "08:30-09:20",
    "09:25-10:15",
    "10:30-11:20",
    "11:25-12:15",
    "13:10-14:00",
    "14:05-14:55",
    "15:00-15:50",
    "15:55-16:45",
  ];

  const classes = [
    {
      id: "1",
      subject: "Math 101",
      startTime: "08:30",
      endTime: "09:20",
      day: "Monday",
      room: "Room 101",
    },
    {
      id: "2",
      subject: "Physics 102",
      startTime: "09:25",
      endTime: "10:15",
      day: "Tuesday",
      room: "Room 102",
    },
    {
      id: "3",
      subject: "Chemistry 103",
      startTime: "10:30",
      endTime: "11:20",
      day: "Wednesday",
      room: "Room 103",
    },
    {
      id: "4",
      subject: "Biology 104",
      startTime: "11:25",
      endTime: "12:15",
      day: "Thursday",
      room: "Room 104",
    },
    {
      id: "5",
      subject: "Computer Science 105",
      startTime: "13:10",
      endTime: "14:00",
      day: "Friday",
      room: "Room 105",
    },
  ];

  // Get classes for a specific day and time range
  const getClassesForSlot = (day, timeRange) => {
    const [startHour] = timeRange.split("-");
    return classes.filter(
      (cls) =>
        cls.day === day && cls.startTime.startsWith(startHour.slice(0, 2))
    );
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Faculty Timetable
      </Typography>

      <Box sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: 800 }} aria-label="faculty timetable" bordered>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", backgroundColor: "#3f51b5", color: "#fff", border: "1px solid #ddd" }}>Time</TableCell>
              {days.map((day) => (
                <TableCell
                  key={day}
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#3f51b5",
                    color: "#fff",
                    border: "1px solid #ddd",
                  }}
                >
                  {day}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {timeRanges.map((timeRange) => (
              <TableRow key={timeRange}>
                <TableCell
                  sx={{
                    backgroundColor: "#f5f5f5",
                    fontWeight: "bold",
                    border: "1px solid #ddd",
                  }}
                >
                  {timeRange}
                </TableCell>
                {days.map((day) => {
                  const classesForTimeSlot = getClassesForSlot(day, timeRange);
                  return (
                    <TableCell
                      key={`${day}-${timeRange}`}
                      sx={{
                        padding: 1,
                        border: "1px solid #ddd",
                        backgroundColor:
                          classesForTimeSlot.length > 0 ? "#e3f2fd" : "#fff",
                      }}
                    >
                      {classesForTimeSlot.map((cls) => (
                        <Box
                          key={cls.id}
                          sx={{
                            padding: 1,
                            backgroundColor: "#bbdefb",
                            marginBottom: 1,
                            borderRadius: 1,
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: "bold", color: "#1976d2" }}
                          >
                            {cls.subject}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {cls.startTime} - {cls.endTime} | {cls.room}
                          </Typography>
                        </Box>
                      ))}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
}
