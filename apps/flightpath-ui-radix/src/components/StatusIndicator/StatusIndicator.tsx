import { clsx } from 'clsx';

import { Surface } from '../Surface/Surface';

import type { AccentColor } from '../../types/AccentColor';
import type { ReactNode } from 'react';

import styles from './StatusIndicator.module.css';

type StatusIndicatorSize = '1' | '2' | '3';

export interface StatusIndicatorProps {
  children: ReactNode;
  asChild?: boolean;
  size?: StatusIndicatorSize;
  color?: AccentColor;
  className?: string;
}

export function StatusIndicator({
  children,
  asChild = false,
  size = '1',
  color,
  className,
}: StatusIndicatorProps) {
  return (
    <Surface
      aria-live="polite"
      asChild={asChild}
      className={clsx(
        styles.statusIndicator,
        styles[`size-${size}`],
        className,
      )}
      color={color}
      role="status"
    >
      {children}
    </Surface>
  );
}
