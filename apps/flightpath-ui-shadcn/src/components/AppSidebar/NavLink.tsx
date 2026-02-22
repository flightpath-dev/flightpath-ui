import {
  SidebarMenuItem,
  SidebarMenuButton,
} from '@flightpath/autopilot/components/Sidebar';
import { Link, useLocation } from 'react-router';

import type { LucideIcon } from 'lucide-react';

interface NavLinkProps {
  title: string;
  icon: LucideIcon;
  path: string;
}

export function NavLink({ title, icon: Icon, path }: NavLinkProps) {
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        isActive={isActive}
        render={
          <Link to={path}>
            <Icon className="size-5" />
            <span>{title}</span>
          </Link>
        }
      />
    </SidebarMenuItem>
  );
}
