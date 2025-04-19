import React, { useState, useEffect } from 'react';

import { useSystemState } from './SystemContext';
import { runWithProtocol } from './protocols';
import { getWhyLogs } from './logs';
import { useAttentionPulse } from './useAttentionPulse';

export const Home = () => {
    const { systemState, setSystemState } = useSystemState();
    const logs = getWhyLogs();
    const pulse = useAttentionPulse();


    const testAgent = () => {
        runWithProtocol({
            intent: 'Schedule project check-in',
            alignmentCheck: () => systemState.mode === 'focus',
            action: () => Promise.resolve('Task scheduled at 3pm'),
        });
    };

    const [_, forceUpdate] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => forceUpdate(x => x + 1), 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
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

            <div>
                <h2>🧠 What Wants Your Attention</h2>
                <ul>
                    {pulse.map((p, i) => <li key={i}>{p.label}</li>)}
                </ul>
            </div>

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
