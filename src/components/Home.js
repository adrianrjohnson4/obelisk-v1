import React from 'react';

import { useSystemState } from './SystemContext';
import { runWithProtocol } from './protocols';
import { getWhyLogs } from './logs';

export const Home = () => {
    const { systemState, setSystemState } = useSystemState();
    const logs = getWhyLogs();

    const testAgent = () => {
        runWithProtocol({
            intent: 'Schedule project check-in',
            alignmentCheck: () => systemState.mode === 'focus',
            action: () => Promise.resolve('Task scheduled at 3pm'),
        });
    };

    return (
        <div style={{ background: '#121212', color: '#eee', padding: '2rem', fontFamily: 'sans-serif' }}>
            <h1>Obelisk</h1>
            <h2>Current Mode: {systemState.mode}</h2>

            <select
                value={systemState.mode}
                onChange={(e) => setSystemState({ ...systemState, mode: e.target.value })}
            >
                <option value='focus'>Focus</option>
                <option value='flow'>Flow</option>
                <option value='breather'>Breather</option>
                <option value='reflect'>Reflect</option>
            </select>

            <h3>Top 3 Goals</h3>
            <ul>{systemState.topGoals.map((goal, i) => <li key={i}>{goal}</li>)}</ul>

            <button onClick={testAgent}>Run Protocol Agent</button>

            <h3>Why Logs</h3>
            <ul>
                {logs.map((log, i) => (
                    <li key={i}>
                        <strong>{log.intent}</strong> → {log.result} @ {log.timestamp.toLocaleTimeString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};
