import { accentToBgColor, accentToTextColor } from '../utils/accentToColor';
import { cn } from '../utils/cn';

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
        accentToBgColor(color),
        accentToTextColor(color, highContrast),
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
