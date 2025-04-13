import React from 'react';
import {
  TextField,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Button,
  Stack,
  InputLabel,
  FormControl,
  Paper,
  Box
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';


const TaskForm = ({ newTask, setNewTask, setTasks }) => {

  const handleAddTask = () => {
    if (!newTask.task.trim()) return;

    const taskToAdd = {
      ...newTask,
      id: Date.now(), // crude Unique id to be replaced later
      status: 'Todo',
      createdAt: new Date().toISOString(),
      completedAt: null,
      deferredUntil: null,
    };

    setTasks((prev) => [...prev, taskToAdd]);

    // Reset the form
    setNewTask({
      task: '',
      project: '',
      priority: 3,
      isTop3Today: false,
      scheduledDate: '',
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center', // centers horizontally
        alignItems: 'flex-start', // or 'center' for vertical centering
        width: '100%',
        paddingTop: 4, // to avoid top edge cling
      }}
    >
      <Paper
        sx={{
          height: 'auto',
          width: '100%',
          maxWidth: 500,
          padding: 4,
          backgroundColor: 'background.paper',
          color: 'text.primary',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          borderRadius: 2,
        }}>
        <Stack spacing={2} sx={{ maxWidth: 400, mb: 4 }}>
          <TextField
            label="Task Name"
            value={newTask.task}
            onChange={(e) => setNewTask({ ...newTask, task: e.target.value })}
            fullWidth
          />

          <FormControl fullWidth>
            <InputLabel>Priority</InputLabel>
            <Select
              value={newTask.priority}
              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
              label="Priority"
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Project (optional)"
            value={newTask.project}
            onChange={(e) => setNewTask({ ...newTask, project: e.target.value })}
            fullWidth
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={newTask.isTop3Today}
                onChange={(e) =>
                  setNewTask({ ...newTask, isTop3Today: e.target.checked })
                }
              />
            }
            label="Mark as Top 3 Focus"
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Scheduled Date"
              value={newTask.scheduledDate ? new Date(newTask.scheduledDate) : null}
              onChange={(date) => {
                const isoDate = date?.toISOString() || '';
                setNewTask({ ...newTask, scheduledDate: isoDate });
              }}
              renderInput={(params) => <TextField { ...params } fullWidth />}
              />
          </LocalizationProvider>

          <Button
            variant="contained"
            color="primary"
            onClick={handleAddTask}
            sx={{ mt: 2 }}
            >
            Add Task
          </Button>
        </Stack>
      </Paper>
    </Box>

  )
}

export default TaskForm;