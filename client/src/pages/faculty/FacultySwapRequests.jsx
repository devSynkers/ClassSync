import { useState } from "react";
import { Button, Card, CardContent, CardHeader, Typography, Box, Divider, Grid, Snackbar, Alert } from "@mui/material";
import { Check, X } from "lucide-react"; // You can replace these with Material UI icons if preferred

// Static data for swap requests (this can be replaced with actual data)
const initialSwapRequests = [
  {
    id: "1",
    requestedBy: "John Doe",
    requestedDate: "2025-04-20",
    status: "pending",
    reason: "Personal emergency, unable to attend the class.",
    fromSlot: {
      day: "Monday",
      startTime: "09:00",
      endTime: "10:00",
      subject: "Math 101",
      class: "B1",
      room: "Room 301"
    },
    toSlot: {
      day: "Tuesday",
      startTime: "10:00",
      endTime: "11:00",
      subject: "Math 101",
      class: "B1",
      room: "Room 302"
    }
  },
  {
    id: "2",
    requestedBy: "Jane Smith",
    requestedDate: "2025-04-21",
    status: "pending",
    reason: "Scheduling conflict with another class.",
    fromSlot: {
      day: "Wednesday",
      startTime: "10:00",
      endTime: "11:00",
      subject: "Physics 201",
      class: "A1",
      room: "Room 202"
    },
    toSlot: {
      day: "Thursday",
      startTime: "11:00",
      endTime: "12:00",
      subject: "Physics 201",
      class: "A1",
      room: "Room 203"
    }
  }
];

export function FacultySwapRequests() {
  const [swapRequests, setSwapRequests] = useState(initialSwapRequests);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleApprove = (requestId) => {
    setSwapRequests(
      swapRequests.map((request) =>
        request.id === requestId ? { ...request, status: "approved" } : request
      )
    );
    setSnackbarMessage("Swap request approved");
    setSnackbarSeverity("success");
    setOpenSnackbar(true);
  };

  const handleDecline = (requestId) => {
    setSwapRequests(
      swapRequests.map((request) =>
        request.id === requestId ? { ...request, status: "declined" } : request
      )
    );
    setSnackbarMessage("Swap request declined");
    setSnackbarSeverity("error");
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Swap Requests
      </Typography>

      {swapRequests.length === 0 ? (
        <Typography variant="body1" color="textSecondary" align="center">
          No swap requests pending
        </Typography>
      ) : (
        <Box>
          {swapRequests.map((request) => (
            <Card key={request.id} sx={{ marginBottom: 2 }}>
              <CardHeader
                title={request.requestedBy}
                subheader={`Requested on ${request.requestedDate}`}
              />
              <CardContent>
                <Typography variant="body1" paragraph>
                  <strong>Reason:</strong> {request.reason}
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" color="primary">
                      From:
                    </Typography>
                    <Typography variant="body2">{`${request.fromSlot.day}, ${request.fromSlot.startTime} - ${request.fromSlot.endTime}`}</Typography>
                    <Typography variant="body2">{request.fromSlot.subject} ({request.fromSlot.class})</Typography>
                    <Typography variant="body2">Room: {request.fromSlot.room}</Typography>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" color="primary">
                      To:
                    </Typography>
                    <Typography variant="body2">{`${request.toSlot.day}, ${request.toSlot.startTime} - ${request.toSlot.endTime}`}</Typography>
                    <Typography variant="body2">{request.toSlot.subject} ({request.toSlot.class})</Typography>
                    <Typography variant="body2">Room: {request.toSlot.room}</Typography>
                  </Grid>
                </Grid>

                <Divider sx={{ marginY: 2 }} />

                <Box display="flex" justifyContent="space-between" alignItems="center">
                  {request.status === "pending" ? (
                    <Box>
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        startIcon={<Check />}
                        onClick={() => handleApprove(request.id)}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        startIcon={<X />}
                        sx={{ marginLeft: 1 }}
                        onClick={() => handleDecline(request.id)}
                      >
                        Decline
                      </Button>
                    </Box>
                  ) : (
                    <Typography
                      variant="body2"
                      color={request.status === "approved" ? "success.main" : "error.main"}
                    >
                      {request.status === "approved" ? "Approved" : "Declined"}
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {/* Snackbar for feedback */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
