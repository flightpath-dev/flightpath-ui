import { Button } from '@radix-ui/themes';
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
    <Button asChild variant={isActive ? 'solid' : 'soft'}>
      <Link to={path}>
        <Icon size={16} />
        <span>{title}</span>
      </Link>
    </Button>
  );
}
