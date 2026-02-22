import { buttonVariants } from '@flightpath/autopilot/components/Button';
import { Link } from 'react-router';

import { FlightpathLogo } from './FlightpathLogo';
import { siteConfig } from '../../config/SiteConfig';

export function HeaderBrand() {
  return (
    <div className="flex items-center gap-2">
      <Link
        to="/"
        className={buttonVariants({ variant: 'default', size: 'icon' })}
      >
        <FlightpathLogo />
      </Link>
      <span className="text-base font-medium tracking-wide">
        {siteConfig.name}
      </span>
    </div>
  );
}
