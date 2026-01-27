import { Surface } from './Surface';
import { cn } from '../utils/cn';

import type { AccentColor } from '../types/AccentColor';
import type { ReactNode } from 'react';

export interface StatusIndicatorProps {
  className?: string;
  color: AccentColor;
  highContrast?: boolean;
  children: ReactNode;
}

export function StatusIndicator({
  className,
  color,
  highContrast = false,
  children,
}: StatusIndicatorProps) {
  return (
    <Surface
      aria-live="polite"
      className={cn(
        'px-2.5 py-1 rounded border-2 font-mono text-xs uppercase tracking-wider',
        className,
      )}
      color={color}
      highContrast={highContrast}
      role="status"
    >
      {children}
    </Surface>
  );
}
