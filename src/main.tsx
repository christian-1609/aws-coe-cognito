import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css';

import { BrowserRouter as Router } from 'react-router-dom';

import { AuthProvider } from './context/AuthProvider.tsx';
import { AppRouter } from './router/AppRouter.tsx';
// Add Code

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      {/* Add code */}
      <Router>
        <AppRouter />
      </Router>
    </AuthProvider>
  </React.StrictMode>,
)
