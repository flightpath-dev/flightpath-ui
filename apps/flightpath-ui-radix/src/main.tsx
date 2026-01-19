import { StrictMode } from 'react';

import { Theme } from '@radix-ui/themes';
import { ThemeProvider } from 'next-themes';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';

import { MAVLinkServiceProvider } from './providers/MAVLinkServiceProvider';
import { routes } from './routes';
// CSS imports - order matters for cascading styles
// eslint-disable-next-line import-x/order
import './styles/reset.css';
// eslint-disable-next-line import-x/order
import '@radix-ui/themes/styles.css';
// eslint-disable-next-line import-x/order
import './styles/variables.css';
// eslint-disable-next-line import-x/order
import './styles/global.css';

const root = createRoot(document.getElementById('root')!);
const router = createBrowserRouter(routes);

root.render(
  <StrictMode>
    <ThemeProvider attribute="class">
      <Theme accentColor="indigo" grayColor="slate">
        <MAVLinkServiceProvider>
          <RouterProvider router={router} />
        </MAVLinkServiceProvider>
      </Theme>
    </ThemeProvider>
  </StrictMode>,
);
