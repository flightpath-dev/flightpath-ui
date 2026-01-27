import { Button } from '@flightpath/autopilot/components/button';
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
    <Button
      variant={isActive ? 'default' : 'secondary'}
      nativeButton={false}
      render={
        <Link to={path}>
          <Icon size={16} />
          <span>{title}</span>
        </Link>
      }
    />
  );
}
