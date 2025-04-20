import React from 'react'
import { SystemProvider } from './components/SystemContext';
import { AppLayout } from './components/AppLayout';

function App() {

  return (
    <SystemProvider>
      <AppLayout />
    </SystemProvider>
  );
}

export default App;
