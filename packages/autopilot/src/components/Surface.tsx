import { accentToColor } from '../utils/accentToColor';
import { cn } from '../utils/cn';

import type { Accent } from '../types/Accent';
import type { ReactNode, HTMLAttributes } from 'react';

export interface SurfaceProps extends HTMLAttributes<HTMLElement> {
  className?: string;
  accent?: Accent;
  contrast?: boolean;
  children: ReactNode;
}

export function Surface({
  className,
  accent = 'neutral',
  contrast = false,
  children,
  ...props
}: SurfaceProps) {
  const colors = accentToColor(accent);
  return (
    <div
      className={cn(
        contrast ? colors.bgContrast : 'bg-card',
        contrast ? colors.textContrast : colors.text,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
