import type { Severity } from '@flightpath/autopilot/types/Severity';

export interface StatusMessage {
  timestamp: Date;
  severity: Severity;
  text: string;
}
