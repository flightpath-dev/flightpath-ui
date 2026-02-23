import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import { App } from './App.tsx';

import './index.css';

const root = createRoot(document.getElementById('root')!);

// Hard-code the dark theme
document.documentElement.classList.add('dark');

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
