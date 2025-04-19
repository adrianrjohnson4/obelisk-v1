import React, { useState } from 'react';
import { useObelisk } from '../components/useObelisk';

export const GoalEngine = () => {
  const { tasks, goals, addGoal } = useObelisk();
  const [goalText, setGoalText] = useState('');
  const [goalType, setGoalType] = useState('weekly');

  const handleAddGoal = () => {
    addGoal({ type: goalType, text: goalText });
    setGoalText('');
  };

  const getReport = () => {
    return goals.map(goal => {
      const relatedTasks = tasks.filter(t => t.goalId === goal.id);
      return {
        ...goal,
        taskCount: relatedTasks.length
      };
    });
  };

  const report = getReport();

  return (
    <div style={{ padding: '1rem' }}>
      <h2>🎯 Goal Alignment Engine</h2>

      <input
        value={goalText}
        placeholder='Add goal (e.g. Drive My Evo)'
        onChange={(e) => setGoalText(e.target.value)}
      />
      <select value={goalType} onChange={(e) => setGoalType(e.target.value)}>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="long_term">Long Term</option>
      </select>
      <button onClick={handleAddGoal}>Add Goal</button>

      <h3>📌 Active Goals</h3>
      <ul>
        {report.map(goal => (
          <li key={goal.id}>
            [{goal.type}] {goal.text} — 🔗 {goal.taskCount} tasks
            {goal.taskCount === 0 && ' ⚠️'}
          </li>
        ))}
      </ul>
    </div>
  );
};
