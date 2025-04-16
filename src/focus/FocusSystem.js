import React, { useState } from 'react';
import { runWithProtocol } from '../components/protocols';
import { addTask, getTopTasks, getAllTasks, completeTask } from './taskUtils';

export const FocusSystem = () => {
    const [taskText, setTaskText] = useState('');
    const [_, forceUpdate] = useState(0); // manual refresh

    const handleAddTask = () => {
        runWithProtocol({
            intent: `Add Task: ${taskText}`,
            alignmentCheck: () => true,
            action: () => {
                addTask(taskText);
                setTaskText('');
                forceUpdate(x => x + 1);
            }
        });
    };

    const handleComplete = (id) => {
        runWithProtocol({
            intent: `Complete Task ID: ${id}`,
            alignmentCheck: () => true,
            action: () => {
                completeTask(id);
                forceUpdate(x => x + 1);
            }
        });
    };

    const topTasks = getTopTasks();
    const allTasks = getAllTasks();

    return (
        <div style={{ padding: '1rem' }}>
            <h2>Focus System</h2>

            <input 
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
                placeholder="Add aligned task"
            />
            <button onClick={handleAddTask}>Add</button>

            <h3>🔥 Top 3 Tasks</h3>
            <ul>
                {topTasks.map(task => (
                    <li key={task.id}>
                        {task.text}
                        <button onClick={() => handleComplete(task.id)}>✓</button>
                    </li>
                ))}
            </ul>

            <h4>🪵 Backlog</h4>
            <ul>
                {allTasks.filter(t => !topTasks.includes(t) && t.status === 'todo').map(t => (
                    <li key={t.id}>{t.text}</li>
                ))}
            </ul>

            <h4>✅ Completed</h4>
            <ul>
                {allTasks.filter(t => t.status === 'done').map(t => (
                    <li key={t.id}>{t.text} - done at {t.completedAt.toLocaleTimeString()}</li>
                ))}
            </ul>
        </div>
    );
};
