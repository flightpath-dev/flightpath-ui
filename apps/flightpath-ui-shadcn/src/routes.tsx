import { RootLayout } from './app/root';
import { FlyView } from './app/routes/fly/route';
import { GuideView } from './app/routes/guide/route';
import { PlanView } from './app/routes/plan/route';
import { mainNavItems } from './config/RouteConfig';

import type { RouteObject } from 'react-router';

export const routes: RouteObject[] = [
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <FlyView />,
      },
      {
        path: mainNavItems.get('plan')!.path,
        element: <PlanView />,
      },
      {
        path: mainNavItems.get('guide')!.path,
        element: <GuideView />,
      },
    ],
  },
];
