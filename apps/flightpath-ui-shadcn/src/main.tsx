import { StrictMode } from 'react';

import { ThemeProvider } from '@flightpath/autopilot/providers/ThemeProvider/ThemeProvider';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';

import { MAVLinkServiceProvider } from './providers/MAVLinkServiceProvider';
import { routes } from './routes';

import '@flightpath/autopilot/globals.css';

const root = createRoot(document.getElementById('root')!);
const router = createBrowserRouter(routes);

// Temporarily hard-code the dark theme
document.documentElement.classList.add('dark');

root.render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
      <MAVLinkServiceProvider>
        <RouterProvider router={router} />
      </MAVLinkServiceProvider>
    </ThemeProvider>
  </StrictMode>,
);
