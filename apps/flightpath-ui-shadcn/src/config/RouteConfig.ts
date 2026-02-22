import { Cpu, Joystick, Waypoints, Settings } from 'lucide-react';

import type { LucideIcon } from 'lucide-react';

export interface NavItem {
  path: string;
  title: string;
  icon: LucideIcon;
}

export const mainNavItems: NavItem[] = [
  { path: '/', title: 'Fly', icon: Joystick },
  { path: '/guide', title: 'Guide', icon: Cpu },
  { path: '/missions', title: 'Missions', icon: Waypoints },
  { path: '/settings', title: 'Settings', icon: Settings },
];
