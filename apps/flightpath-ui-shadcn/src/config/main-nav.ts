import { Cpu, Joystick, Waypoints } from 'lucide-react';

import { RoutePath } from './RoutePath';

import type { LucideIcon } from 'lucide-react';

export interface NavItem {
  title: string;
  icon: LucideIcon;
  path: string;
}

export const mainNavItems: NavItem[] = [
  {
    title: 'Fly',
    icon: Joystick,
    path: RoutePath.Fly,
  },
  {
    title: 'Plan',
    icon: Waypoints,
    path: RoutePath.Plan,
  },
  {
    title: 'Guide',
    icon: Cpu,
    path: RoutePath.Guide,
  },
];
