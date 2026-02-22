import { StrictMode } from 'react';

import { TooltipProvider } from '@flightpath/autopilot/components/Tooltip';
import { ThemeProvider } from '@flightpath/autopilot/providers/ThemeProvider/ThemeProvider';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';

import { MAVLinkServiceProvider } from './providers/MAVLinkServiceProvider';
import { routes } from './routes';

import '@flightpath/autopilot/globals.css';

const root = createRoot(document.getElementById('root')!);
const router = createBrowserRouter(routes);

root.render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
      <TooltipProvider>
        <MAVLinkServiceProvider>
          <RouterProvider router={router} />
        </MAVLinkServiceProvider>
      </TooltipProvider>
    </ThemeProvider>
  </StrictMode>,
);
