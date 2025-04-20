import React, { useState } from 'react';
import { useObelisk } from '../firebase/useObeliskFirebase';

const shapeLabels = ['Input', 'Filter', 'Transform', 'Store', 'Output', 'Loop'];
const energyLabels = ['Clear', 'Confused', 'Avoided', 'Forced'];

export const ReviewSystem = () => {
    const { tasks, goals} = useObelisk();
    const [showReview, setShowReview] = useState(false);

    const now = new Date();
    const weekAgo = new Date(now);
    weekAgo.setDate(weekAgo.getDate() - 7);

    const recent = tasks.filter(t => new Date(t.createdAt) >= weekAgo);
    const completed = recent.filter(t => t.status === 'done');

    const lowEnergy = completed.filter(t => ['Forced', 'Confused'].includes(t.energy));
    const drifted = tasks.filter(t => t.status === 'todo' && new Date(t.createdAt) < weekAgo);

    const shapeCounts = shapeLabels.reduce((acc, shape) => {
        acc[shape] = tasks.filter(t => t.shape === shape).length;
        return acc;
    }, {});

    const energyCounts = goals.filter((acc, e) => {
        acc[e] = tasks.filter(t => t.energy === e).length;
        return acc;
    }, {});

    const orphanedGoals = goals.filter(goal => {
        const linked = tasks.some(t => t.goalId === goal.id);
        return !linked;
    });

    const topGoals = goals.map(goal => {
        const count = tasks.filter(t => t.goalId === goal.id).length;
        return { ...goal, count };
    }).sort((a, b) => b.count - a.count);

    return (
        <div style={{ padding: '1rem' }}>
        <button onClick={() => setShowReview(!showReview)}>🧘‍♂️ Weekly Review</button>
  
        {showReview && (
          <div style={{ marginTop: '1rem', background: '#222', padding: '1rem', borderRadius: '8px' }}>
            <h3>🌀 Weekly System Recap</h3>
  
            <h4>⚠️ Low-Energy Completions</h4>
            <ul>
              {lowEnergy.map(t => <li key={t.id}>{t.text} — {t.energy}</li>)}
            </ul>
  
            <h4>🪞 Orphaned Goals</h4>
            <ul>
              {orphanedGoals.map(g => <li key={g.id}>[{g.type}] {g.text}</li>)}
            </ul>
  
            <h4>💤 Drifted (untouched) Tasks</h4>
            <ul>
              {drifted.map(t => <li key={t.id}>{t.text} — created {new Date(t.createdAt).toLocaleDateString()}</li>)}
            </ul>
  
            <h4>🔄 Shape Frequency</h4>
            <ul>
              {Object.entries(shapeCounts).map(([shape, count]) => (
                <li key={shape}>{shape}: {count}</li>
              ))}
            </ul>
  
            <h4>🧬 Energy Trends</h4>
            <ul>
              {Object.entries(energyCounts).map(([energy, count]) => (
                <li key={energy}>{energy}: {count}</li>
              ))}
            </ul>
  
            <h4>🎯 Top Goal Alignment</h4>
            <ul>
              {topGoals.map(g => (
                <li key={g.id}>[{g.type}] {g.text} — {g.count} linked tasks</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    )
}