import React, { useState, useEffect } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';
import Task from './tasks/Task';

import taskdata from './tasks/taskdata.json';
import TaskForm from './tasks/TaskForm';
import TaskTable from './tasks/TaskTable';
import { FormControlLabel, Switch } from '@mui/material';


function App() {

  const [tasks, setTasks] = useState(taskdata);
  const [newTask, setNewTask] = useState({
    task: '',
    project: '',
    priority: 3,
    isTop3Today: false,
    scheduledDate: '', // optional
  });

  const [showTop3, setShowTop3] = useState(false);
  const displayedTasks = showTop3
    ? tasks.filter((t) => t.isTop3Today)
    : tasks;

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
      <FormControlLabel
        control={<Switch checked={showTop3} onChange={() => setShowTop3(!showTop3)} />}
      label="show Top 3 Only"
      />
      <TaskTable tasks={displayedTasks} setTasks={setTasks} />
      <TaskForm newTask={newTask} setNewTask={setNewTask} setTasks={setTasks} />
      </div>
    </ThemeProvider>
  );
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#282c34',
      paper: '#333840',
    },
    primary: {
      main: '#90caf9', // cool blue for buttons
    },
    secondary: {
      main: '#f48fb1', // soft pink or alternate
    },
    text: {
      primary: '#ffffff',
      secondary: '#cccccc',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

export default App;
