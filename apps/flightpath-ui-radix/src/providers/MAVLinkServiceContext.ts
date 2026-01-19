import { createContext } from 'react';

import type { MAVLinkService } from '../services/MAVLinkService';

export const MAVLinkServiceContext = createContext<MAVLinkService | undefined>(
  undefined,
);
