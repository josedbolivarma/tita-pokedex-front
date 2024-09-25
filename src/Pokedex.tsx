import React, { Suspense } from 'react';
import './App.css';
import { AppRoutes } from './router';
import { Loader } from './shared';

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <AppRoutes />
    </Suspense>
  );
}

export default App;
