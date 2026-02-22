import type { Severity } from '../types/Severity';

/**
 * Color mapping for different severity levels.
 * Contains Tailwind CSS color classes for text, background, and border.
 */
export interface SeverityColors {
  text: string;
  textMuted: string;
  bg: string;
  border: string;
}

/**
 * Maps severity levels to color schemes.
 */
const SEVERITY_COLOR_MAP: Record<Severity, SeverityColors> = {
  info: {
    text: 'text-gray-400',
    textMuted: 'text-gray-400/60',
    bg: 'bg-gray-950/50',
    border: 'border-gray-500/20',
  },
  success: {
    text: 'text-green-400',
    textMuted: 'text-green-400/60',
    bg: 'bg-green-950/50',
    border: 'border-green-500/20',
  },
  warning: {
    text: 'text-amber-400',
    textMuted: 'text-amber-400/60',
    bg: 'bg-amber-950/50',
    border: 'border-amber-500/20',
  },
  error: {
    text: 'text-red-400',
    textMuted: 'text-red-400/60',
    bg: 'bg-red-950/50',
    border: 'border-red-500/20',
  },
};

/**
 * Maps a severity level to corresponding Tailwind CSS color classes.
 *
 * @param severity - The severity level
 * @returns An object containing text, bg, and border color classes
 *
 * @example
 * const colors = severityToColor('error');
 * returns:
 * { text: 'text-red-400', textMuted: 'text-red-400/60', bg: 'bg-red-950/50', border: 'border-red-500/20' }
 */
export function severityToColor(severity: Severity): SeverityColors {
  return SEVERITY_COLOR_MAP[severity];
}
