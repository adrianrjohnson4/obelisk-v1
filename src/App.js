import React from 'react'
import { SystemProvider } from './components/SystemContext';
import { Home } from './components/Home';
import { FocusSystem } from './focus/FocusSystem';
import { FlowSystem } from './flow/FlowSystem';
import { GoalEngine } from './goals/GoalEngine';
import { ReviewSystem } from './components/ReviewSystem';


function App() {

  return (
    <SystemProvider>
      <div style={{ background: '#121212', color: '#eee', padding: '2rem', fontFamily: 'sans-serif', height: '100%' }}>
        <Home />
        
        <FlowSystem />
        
        <GoalEngine />
        
        <FocusSystem />

        <ReviewSystem />
      </div>
    </SystemProvider>
  );
}

export default App;
