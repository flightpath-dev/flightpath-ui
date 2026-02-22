import type { Severity } from './Severity';

export interface Message {
  timestamp: Date;
  severity: Severity;
  text: string;
}
