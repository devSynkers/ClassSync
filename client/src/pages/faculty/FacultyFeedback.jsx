import { useState, useEffect } from "react";
import { Button, Box, Typography, Divider } from "@mui/material";

export function FacultyFeedback() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const facultyId = localStorage.getItem("faculty_id");

  useEffect(() => {
    if (!facultyId) return;

    fetch(`http://localhost:3000/faculty/feedback/${facultyId}`)
      .then((res) => res.json())
      .then((data) => setFeedbackList(data))
      .catch((err) => console.error("Error fetching feedback:", err));
  }, [facultyId]);

  const markAsRead = (id) => {
    fetch(`http://localhost:3000/faculty/feedback/mark-read/${id}`, {
      method: "PATCH",
    });

    setFeedbackList((prev) =>
      prev.map((feedback) =>
        feedback.id === id ? { ...feedback, read: true } : feedback
      )
    );
  };

  const handleSelectFeedback = (feedback) => {
    setSelectedFeedback(feedback);
    if (!feedback.read) {
      markAsRead(feedback.id);
    }
  };

  const unreadCount = feedbackList.filter((f) => !f.read).length;

  return (
    <Box sx={{ padding: 3, maxWidth: 1200, margin: "0 auto" }}>
      <Typography variant="h5" gutterBottom>
        Student Feedback
        {unreadCount > 0 && (
          <span
            style={{
              marginLeft: "8px",
              backgroundColor: "#ff4d4d",
              color: "#fff",
              padding: "2px 8px",
              borderRadius: "50%",
            }}
          >
            {unreadCount} new
          </span>
        )}
      </Typography>

      <Box display="grid" gridTemplateColumns="1fr 2fr" gap={3}>
        <Box sx={{ maxHeight: "500px", overflowY: "auto" }}>
          {feedbackList.map((feedback) => (
            <Button
              key={feedback.id}
              variant="outlined"
              fullWidth
              sx={{
                justifyContent: "flex-start",
                padding: "12px 16px",
                textAlign: "left",
                backgroundColor:
                  selectedFeedback?.id === feedback.id ? "#f5f5f5" : "transparent",
                fontWeight: feedback.read ? "normal" : "bold",
                marginBottom: 2,
                "&:hover": { backgroundColor: "#f5f5f5" },
              }}
              onClick={() => handleSelectFeedback(feedback)}
            >
              <Box sx={{ width: "100%" }}>
                <Typography variant="body1" noWrap>
                  {feedback.student_name}
                </Typography>
                <Typography variant="body2" color="textSecondary" noWrap>
                  {feedback.subject}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {new Date(feedback.date).toLocaleDateString()}
                </Typography>
              </Box>
            </Button>
          ))}
        </Box>

        <Box>
          {selectedFeedback ? (
            <Box sx={{ padding: 2, backgroundColor: "#fafafa", borderRadius: 2 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Box>
                  <Typography variant="h6">{selectedFeedback.subject}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    From: {selectedFeedback.student_name} ({selectedFeedback.student_id})
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {new Date(selectedFeedback.date).toLocaleDateString()}
                  </Typography>
                </Box>
          
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant="body2">{selectedFeedback.message}</Typography>
            </Box>
          ) : (
            <Box sx={{ textAlign: "center", padding: 3 }}>
              <Typography variant="body2" color="textSecondary">
                Select a message to view
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
