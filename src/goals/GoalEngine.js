import React, { useState } from 'react';
import { addGoal, getGoals } from './goalUtils';
import { getAllTasks } from '../focus/taskUtils';

export const GoalEngine = () => {
    const [goalText, setGoalText] = useState('');
    const [goalType, setGoalType] = useState('weekly');
    const goals = getGoals();
    const tasks = getAllTasks();

    const handleAddGoal = () => {
        addGoal({ type: goalType, text: goalText });
        setGoalText('');
    };

    const getReport = () => {
        const report = goals.map(goal => {
            const relatedTasks = tasks.filter(t => t.goalId === goal.id);
            return {
                ...goal,
                taskCount: relatedTasks.length
            };
        });
        return report;
    };

    const report = getReport();

    return (
        <div style={{ padding: '1rem'}}>
            <h2>🎯 Goal Alignment Engine</h2>

            <input 
                value={goalText}
                placeholder='Add a goal (e.g. Finish Buying Evo)'
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
                        [{goal.type}] {goal.text} - 🔗 {goal.taskCount} tasks
                        {goal.taskCount === 0 && ' ⚠️'}
                    </li>
                ))}
            </ul>
        </div>
    );
};
