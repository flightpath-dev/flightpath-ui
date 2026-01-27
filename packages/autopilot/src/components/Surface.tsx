import { cn } from '../utils/cn';
import { getSurfaceBgColor, getSurfaceTextColor } from '../utils/surface-utils';

import type { AccentColor } from '../types/AccentColor';
import type { ReactNode, HTMLAttributes } from 'react';

export interface SurfaceProps extends HTMLAttributes<HTMLElement> {
  className?: string;
  color: AccentColor;
  highContrast?: boolean;
  children: ReactNode;
}

export function Surface({
  className,
  color,
  highContrast = false,
  children,
  ...props
}: SurfaceProps) {
  return (
    <div
      className={cn(
        getSurfaceBgColor(color),
        getSurfaceTextColor(color, highContrast),
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
