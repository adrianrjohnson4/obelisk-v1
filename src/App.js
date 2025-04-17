import React from 'react'
import { SystemProvider } from './components/SystemContext';
import { Home } from './components/Home';
import { FocusSystem } from './focus/FocusSystem';
import { FlowSystem } from './flow/FlowSystem';
import { GoalEngine } from './goals/GoalEngine';


function App() {

  return (
    <SystemProvider>
      <div style={{ background: '#121212', color: '#eee', padding: '2rem', fontFamily: 'sans-serif', height: '100vh' }}>
        <Home />
        <divider style={{ backgroundColor: 'white'}} />
        <FlowSystem />
        <divider />
        <GoalEngine />
        <divider />
        <FocusSystem />
      </div>
    </SystemProvider>
  );
}

export default App;
