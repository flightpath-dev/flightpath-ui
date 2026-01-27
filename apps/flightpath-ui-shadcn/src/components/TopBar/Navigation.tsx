import { NavLink } from './NavLink';
import { mainNavItems, RoutePathEnum } from '../../config/RouteConfig';

export function Navigation() {
  return (
    <nav className="flex items-center gap-2">
      {Object.values(RoutePathEnum).map((routePath) => {
        const navItem = mainNavItems.get(routePath)!;
        return (
          <NavLink
            icon={navItem.icon}
            key={navItem.path}
            path={navItem.path}
            title={navItem.title}
          />
        );
      })}
    </nav>
  );
}
