import { Box, Card, CardContent, CardHeader, Typography, Grid, IconButton } from "@mui/material";
import { Check, Calendar, MessageSquare, Book } from "lucide-react"; // Use your preferred icons, they can be from material-ui or lucide-react.

const FacultyDashBoard = () => {
  const unreadFeedbacks = 5; // Example data
  const pendingSwaps = 2; // Example data
  const pendingTasks = 3; // Example data
  const upcomingMeetings = 4; // Example data

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <Box sx={{ flex: 1, padding: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 4 }}>
          Dashboard
        </Typography>

        {/* Cards Row */}
        <Grid container spacing={4} sx={{ marginBottom: 4 }}>
          {/* Pending Tasks */}
          <Grid item xs={12} md={6} lg={3}>
            <Card>
              <CardHeader
                title="Pending Tasks"
                subheader={`${pendingTasks} task${pendingTasks !== 1 ? "s" : ""}`}
                action={
                  <IconButton>
                    <Check color="primary" />
                  </IconButton>
                }
              />
              <CardContent>
                <Typography variant="h5" color="textPrimary">
                  {pendingTasks}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {pendingTasks === 1 ? "item" : "items"} on your to-do list.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Pending Swaps */}
          <Grid item xs={12} md={6} lg={3}>
            <Card>
              <CardHeader
                title="Pending Swaps"
                subheader={`${pendingSwaps} swap${pendingSwaps !== 1 ? "s" : ""}`}
                action={
                  <IconButton>
                    <Calendar color="primary" />
                  </IconButton>
                }
              />
              <CardContent>
                <Typography variant="h5" color="textPrimary">
                  {pendingSwaps}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {pendingSwaps === 1 ? "request" : "requests"} waiting for approval
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Unread Feedback */}
          <Grid item xs={12} md={6} lg={3}>
            <Card>
              <CardHeader
                title="Unread Feedback"
                subheader={`${unreadFeedbacks} feedback${unreadFeedbacks !== 1 ? "s" : ""}`}
                action={
                  <IconButton>
                    <MessageSquare color="primary" />
                  </IconButton>
                }
              />
              <CardContent>
                <Typography variant="h5" color="textPrimary">
                  {unreadFeedbacks}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {unreadFeedbacks === 1 ? "message" : "messages"} from students.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Upcoming Meetings */}
          <Grid item xs={12} md={6} lg={3}>
            <Card>
              <CardHeader
                title="Upcoming Meetings"
                subheader={`${upcomingMeetings} meeting${upcomingMeetings !== 1 ? "s" : ""}`}
                action={
                  <IconButton>
                    <Book color="primary" />
                  </IconButton>
                }
              />
              <CardContent>
                <Typography variant="h5" color="textPrimary">
                  {upcomingMeetings}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {upcomingMeetings === 1 ? "meeting" : "meetings"} scheduled.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Additional Grid for more details like timetable, etc. */}
        <Grid container spacing={4}>
          {/* Additional content like timetable, swap requests, etc can go here */}
          {/* Example: */}
          {/* <TimetableView /> */}
          {/* <SwapRequests /> */}
        </Grid>
      </Box>
    </Box>
  );
};

export default FacultyDashBoard;
