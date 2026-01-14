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
    title: 'Manual',
    icon: Joystick,
    path: RoutePath.Manual,
  },
  {
    title: 'Mission',
    icon: Waypoints,
    path: RoutePath.Mission,
  },
  {
    title: 'Guided',
    icon: Cpu,
    path: RoutePath.Guided,
  },
];
