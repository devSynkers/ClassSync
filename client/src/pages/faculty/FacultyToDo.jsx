import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  TextField,
  Typography,
  Snackbar,
  Alert,
  Chip,
  MenuItem,
} from "@mui/material";

const initialTodoItems = [
  {
    id: "todo-1",
    title: "Prepare lecture notes",
    description: "Chapter 4: React Hooks",
    dueDate: "2025-04-25",
    completed: false,
    priority: "high",
  },
];

export default function TodoList() {
  const [todoItems, setTodoItems] = useState(initialTodoItems);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Form state
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
  });

  const handleAddTask = () => {
    if (!newTask.title.trim()) return;

    const newItem = {
      ...newTask,
      id: `todo-${Date.now()}`,
      completed: false,
    };

    setTodoItems([newItem, ...todoItems]);
    setNewTask({ title: "", description: "", dueDate: "", priority: "medium" });
    setSnackbarOpen(true);
  };

  const handleToggleComplete = (id) => {
    setTodoItems(
      todoItems.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const [activeFilter, setActiveFilter] = useState("all");

  const filteredTodos = todoItems.filter((todo) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "pending") return !todo.completed;
    if (activeFilter === "completed") return todo.completed;
    return true;
  });

  const pendingCount = todoItems.filter((item) => !item.completed).length;
  const completedCount = todoItems.filter((item) => item.completed).length;

  return (
    <Box sx={{ p: 3, bgcolor: "#fff", borderRadius: 2, boxShadow: 1 }}>
      <Typography variant="h5" gutterBottom>
        To-Do List
      </Typography>

      {/* Task Input Fields */}
      <Box display="grid" gap={2} mb={2}>
        <TextField
          label="Task Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          fullWidth
          size="small"
        />
        <TextField
          label="Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          fullWidth
          size="small"
        />
        <TextField
          label="Due Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={newTask.dueDate}
          onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
          size="small"
        />
        <TextField
          label="Priority"
          select
          value={newTask.priority}
          onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
          size="small"
        >
          <MenuItem value="low">Low</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="high">High</MenuItem>
        </TextField>
        <Button variant="contained" onClick={handleAddTask}>
          Add Task
        </Button>
      </Box>

      {/* Filter Buttons */}
      <Box display="flex" gap={1} mb={2}>
        <Button
          variant={activeFilter === "all" ? "contained" : "outlined"}
          onClick={() => setActiveFilter("all")}
        >
          All ({todoItems.length})
        </Button>
        <Button
          variant={activeFilter === "pending" ? "contained" : "outlined"}
          onClick={() => setActiveFilter("pending")}
        >
          Pending ({pendingCount})
        </Button>
        <Button
          variant={activeFilter === "completed" ? "contained" : "outlined"}
          onClick={() => setActiveFilter("completed")}
        >
          Completed ({completedCount})
        </Button>
      </Box>

      {/* Task List */}
      <Box sx={{ maxHeight: 400, overflowY: "auto", display: "grid", gap: 2 }}>
        {filteredTodos.length === 0 ? (
          <Typography align="center" color="text.secondary">
            No tasks found
          </Typography>
        ) : (
          filteredTodos.map((item) => (
            <Box
              key={item.id}
              display="flex"
              alignItems="flex-start"
              p={2}
              border={1}
              borderColor="divider"
              borderRadius={1}
              bgcolor={item.completed ? "#f0f0f0" : "background.paper"}
            >
              <Checkbox
                checked={item.completed}
                onChange={() => handleToggleComplete(item.id)}
                sx={{ mt: 0.5 }}
              />
              <Box flexGrow={1}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    textDecoration: item.completed ? "line-through" : "none",
                    color: item.completed ? "text.secondary" : "text.primary",
                  }}
                >
                  {item.title}
                </Typography>
                {item.description && (
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                )}
                {item.dueDate && (
                  <Typography variant="caption" color="text.secondary">
                    Due: {item.dueDate}
                  </Typography>
                )}
              </Box>
              <Chip
                label={item.priority}
                size="small"
                sx={{
                  bgcolor:
                    item.priority === "high"
                      ? "#fdecea"
                      : item.priority === "medium"
                      ? "#fff4e5"
                      : "#e6f4ea",
                  color:
                    item.priority === "high"
                      ? "#d32f2f"
                      : item.priority === "medium"
                      ? "#ed6c02"
                      : "#2e7d32",
                  ml: 2,
                  mt: 0.5,
                }}
              />
            </Box>
          ))
        )}
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: "100%" }}>
          Task added successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}
