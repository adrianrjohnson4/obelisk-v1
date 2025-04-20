import React, { useState } from 'react';
import { useObelisk } from '../../src/components/useObelisk';
import { runWithProtocol } from '../components/protocols';

const intentionLog = [];
const reflectionLog = [];

const now = new Date();
const hours = now.getHours();

export const FlowSystem = () => {
    const [morningInput, setMorningInput] = useState('');
    const [top3Input, setTop3Input] = useState(['', '', '']);
    const [eveningInput, setEveningInput] = useState('');

     const { addTask } = useObelisk();

    const handleMorningSubmit = () => {
        top3Input.forEach(text => {
            if (text.trim()) {
                runWithProtocol({
                    intent: `Morning Task: ${text}`,
                    alignmentCheck: () => true,
                    action: () => addTask(text)
                });
            }
        });

        intentionLog.push({
            date: new Date(),
            text: morningInput
        });

        setMorningInput('');
        setTop3Input(['', '', '']);
    };

    const handleEveningSubmit = () => {
        reflectionLog.push({
            date: new Date(),
            text: eveningInput
        });

        setEveningInput('');
    };

    const isMorning = hours < 12;
    const isEvening = hours >= 16;

    return (
        <div style={{ padding: '1rem' }}>
            <h2>Daily Flow</h2>

            {isMorning && (
                <div>
                    <h3>🌅 Morning Intention</h3>
                    <textarea
                        placeholder='What is my intention today?'
                        value={morningInput}
                        onChange={(e) => setMorningInput(e.target.value)}
                    />
                    <h4>Your Top 3 Today</h4>
                    {top3Input.map((t, i) => (
                        <input
                            key={i}
                            value={t}
                            placeholder={`Task ${i + 1}`}
                            onChange={(e) => {
                                const next = [...top3Input];
                                next[i] = e.target.value;
                                setTop3Input(next);
                            }}
                        />
                    ))}
                    <button onClick={handleMorningSubmit}>Set Morning Intention</button>
                </div>
            )}

            {isEvening && (
                <div>
                    <h3>🌙 Evening Reflection</h3>
                    <textarea
                        placeholder="What did you learn or notice today?"
                        value={eveningInput}
                        onChange={(e) => setEveningInput(e.target.value)}
                    />
                    <button onClick={handleEveningSubmit}>Log Evening Reflection</button>
                </div>
            )}

            <h4>🧠 Last Intention</h4>
            {intentionLog.length > 0 && (
                <blockquote>{intentionLog.at(-1).text}</blockquote>
            )}

            <h4>🧠 Last Reflection</h4>
            {reflectionLog.length > 0 && (
                <blockquote>{reflectionLog.at(-1).text}</blockquote>
            )}

        </div>
    )
}
