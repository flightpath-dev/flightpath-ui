import { Navigate } from 'react-router';

import { RootLayout } from './app/root';
import { GuidedView } from './app/routes/guided/route';
import { ManualView } from './app/routes/manual/route';
import { MissionView } from './app/routes/mission/route';
import { RoutePath } from './config/RoutePath';

import type { RouteObject } from 'react-router';

export const routes: RouteObject[] = [
  {
    element: <RootLayout />,
    children: [
      {
        path: RoutePath.Root,
        element: <Navigate replace to={RoutePath.Manual} />,
      },
      {
        path: RoutePath.Manual,
        element: <ManualView />,
      },
      {
        path: RoutePath.Mission,
        element: <MissionView />,
      },
      {
        path: RoutePath.Guided,
        element: <GuidedView />,
      },
    ],
  },
];
