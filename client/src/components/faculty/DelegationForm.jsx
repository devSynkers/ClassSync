// DelegationForm.jsx
import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, MenuItem, Typography, Box
} from '@mui/material';

const DelegationForm = ({ open, onClose, period, onSubmit }) => {
  const [formData, setFormData] = useState({
    toFacultyId: '',
    reason: '',
    message: '',
  });

  const faculties = [
    { id: 'f2', name: 'Dr. Smith' },
    { id: 'f3', name: 'Prof. Emily' },
  ];

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = () => {
    onSubmit(formData);
    onClose();
    setFormData({ toFacultyId: '', reason: '', message: '' });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delegate Class</DialogTitle>
      <DialogContent dividers>
        {period && (
          <Box mb={2}>
            <Typography variant="body2">
              <strong>Course:</strong> {period.courseCode} - {period.courseName}
            </Typography>
            <Typography variant="body2">
              <strong>Room:</strong> {period.room}
            </Typography>
            <Typography variant="body2">
              <strong>Time:</strong> {period.day}, {period.time}
            </Typography>
          </Box>
        )}

        <TextField
          select
          label="Delegate To"
          name="toFacultyId"
          fullWidth
          margin="normal"
          value={formData.toFacultyId}
          onChange={handleChange}
        >
          {faculties.map(fac => (
            <MenuItem key={fac.id} value={fac.id}>{fac.name}</MenuItem>
          ))}
        </TextField>

        <TextField
          label="Reason"
          name="reason"
          fullWidth
          multiline
          rows={3}
          margin="normal"
          value={formData.reason}
          onChange={handleChange}
        />

        <TextField
          label="Additional Message (optional)"
          name="message"
          fullWidth
          multiline
          rows={2}
          margin="normal"
          value={formData.message}
          onChange={handleChange}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="outlined">Cancel</Button>
        <Button onClick={handleFormSubmit} variant="contained">Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DelegationForm;
