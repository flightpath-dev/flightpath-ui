import type { Severity } from './Severity';

export interface StatusMessage {
  timestamp: Date;
  severity: Severity;
  text: string;
}
