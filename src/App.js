import React, { useState, useEffect } from 'react'
import './App.css';
import Task from './tasks/Task';

import taskdata from './tasks/taskdata.json';


function App() {

  const [tasks, setTasks] = useState(taskdata)


  return (
    <div className="App">
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
}

export default App;
