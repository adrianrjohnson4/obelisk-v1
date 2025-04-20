import React from 'react'
import { SystemProvider } from './components/SystemContext';
import { Home } from './components/Home';
import { FocusSystem } from './focus/FocusSystem';
import { FlowSystem } from './flow/FlowSystem';
import { GoalEngine } from './goals/GoalEngine';
import { ReviewSystem } from './components/ReviewSystem';

import { AppLayout } from './components/AppLayout';


function App() {

  return (
    <SystemProvider>
      <AppLayout />
    </SystemProvider>
  );
}

export default App;
