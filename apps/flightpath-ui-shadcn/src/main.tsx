import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';

import { routes } from './routes';

import './index.css';
import '@flightpath/autopilot/index.css';

const root = createRoot(document.getElementById('root')!);
const router = createBrowserRouter(routes);

// Temporarily hard-code the dark theme
document.documentElement.classList.add('dark');

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
