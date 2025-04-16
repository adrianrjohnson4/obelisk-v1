import React, { createContext, useContext, useState } from 'react';

const SystemContext = createContext();

const defaultState = {
    mode: 'focus',
    topGoals: ['Launch V1', 'Track Attention', 'Maintain Sovereignty'],
    logs: [],
};

export const SystemProvider = ({ children }) => {
    const [systemState, setSystemState] = useState(defaultState);
    return (
        <SystemContext.Provider value={{ systemState, setSystemState }}>
            {children}
        </SystemContext.Provider>
    );
};

export const useSystemState = () => useContext(SystemContext);
