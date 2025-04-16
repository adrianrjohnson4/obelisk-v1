import React from 'react'
import { SystemProvider } from './components/SystemContext';
import { Home } from './components/Home';
import { FocusSystem } from './focus/FocusSystem';


function App() {

  return (
    <SystemProvider>
      <Home />
      <FocusSystem />
    </SystemProvider>
  );
}

export default App;
