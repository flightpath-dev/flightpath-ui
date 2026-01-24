import { Cpu, Joystick, Waypoints } from 'lucide-react';

import type { LucideIcon } from 'lucide-react';

export enum RoutePathEnum {
  Fly = 'fly',
  Plan = 'plan',
  Guide = 'guide',
}

export type RoutePath = `${RoutePathEnum}`;

export interface NavItem {
  path: string;
  title: string;
  icon: LucideIcon;
}

export const mainNavItems = new Map<RoutePath, NavItem>([
  ['fly', { path: '/', title: 'Fly', icon: Joystick }],
  ['plan', { path: '/plan', title: 'Plan', icon: Waypoints }],
  ['guide', { path: '/guide', title: 'Guide', icon: Cpu }],
]);
