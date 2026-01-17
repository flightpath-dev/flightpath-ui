import { Navigate } from 'react-router';

import { RootLayout } from './app/root';
import { FlyView } from './app/routes/fly/route';
import { GuideView } from './app/routes/guide/route';
import { PlanView } from './app/routes/plan/route';
import { RoutePath } from './config/RoutePath';

import type { RouteObject } from 'react-router';

export const routes: RouteObject[] = [
  {
    element: <RootLayout />,
    children: [
      {
        path: RoutePath.Root,
        element: <Navigate replace to={RoutePath.Fly} />,
      },
      {
        path: RoutePath.Fly,
        element: <FlyView />,
      },
      {
        path: RoutePath.Plan,
        element: <PlanView />,
      },
      {
        path: RoutePath.Guide,
        element: <GuideView />,
      },
    ],
  },
];
