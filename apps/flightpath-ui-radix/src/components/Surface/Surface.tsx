import { Slot } from '@radix-ui/react-slot';
import { clsx } from 'clsx';

import type { AccentColor } from '../../types/AccentColor';
import type { ReactNode, HTMLAttributes } from 'react';

import styles from './Surface.module.css';

export interface SurfaceProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  asChild?: boolean;
  color?: AccentColor;
  className?: string;
}

export function Surface({
  children,
  asChild = false,
  color,
  className,
  ...props
}: SurfaceProps) {
  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      className={clsx(color && styles[`color-${color}`], className)}
      {...props}
    >
      {children}
    </Comp>
  );
}
