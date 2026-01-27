import { cn } from '../utils/cn';
import { getSurfaceTextColor } from '../utils/surface-utils';

import type { AccentColor } from '../types/AccentColor';

interface MetricDisplayProps {
  label: string;
  value: string;
  unit?: string;
  color?: AccentColor;
}

export function MetricDisplay({
  label,
  value,
  unit,
  color,
}: MetricDisplayProps) {
  return (
    <div className="flex flex-col">
      <span className="text-muted-foreground text-xs">{label}</span>
      <div className="flex items-baseline gap-1">
        <span className={cn('font-mono text-lg', getSurfaceTextColor(color))}>
          {value}
        </span>
        {unit !== undefined && unit !== '' && (
          <span
            className={cn('text-xs opacity-60', getSurfaceTextColor(color))}
          >
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}
