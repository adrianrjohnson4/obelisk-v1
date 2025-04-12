import React, { useState, useEffect } from 'react'
import './App.css';
import Task from './tasks/Task';


function App() {

  const [tasks, setTasks] = useState([
    {
      id: 1,
      task: 'Finish wiring Breather Mode UI',
      priority: 5,
      status: 'todo',
      project: 'Obelisk Core',
      source: 'manual',
      scheduledDate: '2025-04-13T09:00:00',
      isTop3Today: true,
      createdAt: '2025-04-12T21:00:00',
      completedAt: null
    },
    {
      id: '2',
      task: 'Add “Goal Alignment” tags to Top 3 tasks',
      priority: 4,
      status: 'in progress',
      project: 'Goal Engine',
      source: 'AI',
      scheduledDate: '2025-04-13T13:00:00',
      isTop3Today: true,
      createdAt: '2025-04-12T22:00:00',
      completedAt: null,
    },
    {
      id: '3',
      task: 'Upload Dre’s Letter into Second Brain',
      priority: 3,
      status: 'todo',
      project: 'Memory Ingestion',
      source: 'email',
      scheduledDate: '2025-04-13T15:30:00',
      isTop3Today: false,
      createdAt: '2025-04-12T23:00:00',
      completedAt: null,
    }
  ])


  return (
    <div className="App">
      {tasks.map((task) => (
        <Task task={task} />
      ))}
    </div>
  );
}

export default App;
