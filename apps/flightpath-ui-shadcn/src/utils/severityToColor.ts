import type { AccentColor } from '../types/AccentColor';
import type { Severity } from '../types/Severity';

const SEVERITY_COLOR_MAP: Record<Severity, AccentColor> = {
  info: 'gray',
  success: 'green',
  warning: 'amber',
  error: 'red',
};

export function severityToColor(severity: Severity): AccentColor {
  return SEVERITY_COLOR_MAP[severity];
}
