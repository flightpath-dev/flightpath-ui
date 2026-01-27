import { useMemo } from 'react';

import { MAVLinkServiceContext } from './MAVLinkServiceContext';
import { ServiceProvider } from './ServiceProvider';
import { MAVLinkServiceImpl } from '../services/MAVLinkServiceImpl';

import type { ReactNode } from 'react';

export interface MAVLinkServiceProviderProps {
  children?: ReactNode;
}

export function MAVLinkServiceProvider({
  children,
}: MAVLinkServiceProviderProps) {
  const mavlinkService = useMemo(() => new MAVLinkServiceImpl(), []);

  return (
    <ServiceProvider
      serviceContext={MAVLinkServiceContext}
      serviceInstance={mavlinkService}
    >
      {children}
    </ServiceProvider>
  );
}
