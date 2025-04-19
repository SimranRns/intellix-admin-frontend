import { StrictMode } from 'react'
import React from "react";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './component/Admin/Dashboard/ThemeContext';
import { Provider } from '@radix-ui/react-tooltip';
import { store } from './component/Admin/Store/Store';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </StrictMode>,
)
