import React, { useState } from 'react';
import { useObelisk } from '../firebase/useObeliskFirebase';
import { runWithProtocol } from '../firebase/runWithProtocolFirebase';
import { logCompletedTask } from '../firebase/logCompletedTaskFirebase';

const shapeOptions = ['Input', 'Filter', 'Transform', 'Store', 'Output', 'Loop'];
const energyOptions = ['Clear', 'Confused', 'Avoided', 'Forced'];

export const FocusSystem = () => {
  const { tasks, addTask, completeTask } = useObelisk();

  const [taskText, setTaskText] = useState('');
  const [shape, setShape] = useState('');
  const [energy, setEnergy] = useState('');
  const [reflectingTask, setReflectingTask] = useState(null);

  const topTasks = tasks
    .filter(t => t.status === 'todo')
    .sort((a, b) => (b.score || 0) - (a.score || 0))
    .slice(0, 3);

  const handleAddTask = () => {
    runWithProtocol({
      intent: `Add Task: ${taskText}`,
      alignmentCheck: () => true,
      action: () => {
        addTask(taskText, shape, energy);
        setTaskText('');
        setShape('Input');
        setEnergy('Clear');
      }
    });
  };

  const handleComplete = (id) => {
    const task = tasks.find(t => t.id === id);
    setReflectingTask(task); // This triggers the modal
    runWithProtocol({
      intent: `Complete Task ID: ${id}`,
      alignmentCheck: () => true,
      action: () => {
        completeTask(id);
      }
    });
  };

  const TaskReflectionModal = ({ task, onClose }) => {
    const options = ['Peaceful', 'Energizing', 'Forced', 'Avoided', 'Draining'];

    const handleSelect = (feeling) => {
      // Log it
      runWithProtocol({
        intent: `Reflection on task: ${task.text}`,
        alignmentCheck: () => true,
        action: () => {
          task.energyReflection = feeling;
          logCompletedTask(task, feeling);
          return `Felt: ${feeling}`
        }
      });

      onClose();
    }
    return (
      <div style={{
        background: '#111', color: '#eee', padding: '1rem', borderRadius: '10px',
        position: 'fixed', top: '30%', left: '30%', width: '40%', zIndex: 1000
      }}>
        <h3>🧠 How did this task feel?</h3>
        <p>{task.text}</p>
        {options.map(opt => (
          <button key={opt} onClick={() => handleSelect(opt)} style={{ margin: '0.5rem' }}>
            {opt}
          </button>
        ))}
      </div>
    );
  };

  

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Focus System</h2>

      <input
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Add aligned task"
      />
      <select value={shape} onChange={(e) => setShape(e.target.value)}>
        <option value="">Shape</option>
        {shapeOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
      <select value={energy} onChange={(e) => setEnergy(e.target.value)}>
        <option value="">Energy</option>
        {energyOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
      <button onClick={handleAddTask}>Add</button>

      <h3>🔥 Top 3 Tasks</h3>
      <ul>
        {topTasks.map(task => (
          <li key={task.id}>
            {task.text}
            {task.shape && <span style={{ marginLeft: '1rem', fontSize: '0.8em' }}>🔷 {task.shape}</span>}
            {task.energy && <span style={{ marginLeft: '0.5rem', fontSize: '0.8em' }}>🧬 {task.energy}</span>}
            <button onClick={() => handleComplete(task.id)} style={{ marginLeft: '0.5rem' }}>✓</button>
          </li>
        ))}
      </ul>

      <h4>🪵 Backlog</h4>
      <ul>
        {tasks.filter(t => !topTasks.includes(t) && t.status === 'todo').map(t => (
          <li key={t.id}>
            {t.text}
            {t.shape && <span style={{ marginLeft: '1rem', fontSize: '0.8em' }}>🔷 {t.shape}</span>}
            {t.energy && <span style={{ marginLeft: '0.5rem', fontSize: '0.8em' }}>🧬 {t.energy}</span>}
          </li>
        ))}
      </ul>

      <h4>✅ Completed</h4>
      <ul>
        {tasks.filter(t => t.status === 'done').map(t => (
          <li key={t.id}>
            {t.text} - done at {new Date(t.completedAt).toLocaleTimeString()}
            {t.shape && <span style={{ marginLeft: '1rem', fontSize: '0.8em' }}>🔷 {t.shape}</span>}
            {t.energy && <span style={{ marginLeft: '0.5rem', fontSize: '0.8em' }}>🧬 {t.energy}</span>}
            {t.energyReflection && (
              <span style={{ marginLeft: '1rem', fontSize: '0.8em' }}>🪞 {t.energyReflection}</span>
            )}
          </li>
        ))}
      </ul>

      {reflectingTask && (
        <TaskReflectionModal task={reflectingTask} onClose={() => setReflectingTask(null)} />
      )}
    </div>
  );
};
