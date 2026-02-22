import { RootLayout } from './app/RootLayout';
import { FlyPage } from './app/routes/fly/FlyPage';
import { GuidePage } from './app/routes/guide/GuidePage';
import { MissionsPage } from './app/routes/missions/MissionsPage';
import { NotFoundPage } from './app/routes/not-found/NotFoundPage';
import { SettingsPage } from './app/routes/settings/SettingsPage';
import { mainNavItems } from './config/RouteConfig';

import type { ReactNode } from 'react';
import type { RouteObject } from 'react-router';

const navElementByPath: Record<string, ReactNode> = {
  '/': <FlyPage />,
  '/guide': <GuidePage />,
  '/missions': <MissionsPage />,
  '/settings': <SettingsPage />,
};

export const routes: RouteObject[] = [
  {
    element: <RootLayout />,
    children: [
      ...mainNavItems.map((item) => ({
        path: item.path,
        element: navElementByPath[item.path],
      })),
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];
