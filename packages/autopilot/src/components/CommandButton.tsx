import { cn } from '../utils/cn';
import { getSurfaceTextColor } from '../utils/surface-utils';

import type { AccentColor } from '../types/AccentColor';

interface CommandButtonProps extends React.ComponentProps<'button'> {
  color?: AccentColor;
}

export function CommandButton({
  color,
  className,
  children,
  ...props
}: CommandButtonProps) {
  const colorClass = color ? getSurfaceTextColor(color) : undefined;

  return (
    <button
      className={cn(
        'w-full py-3 flex flex-col items-center justify-center gap-1 transition-all text-[10px] font-medium leading-tight disabled:pointer-events-none disabled:opacity-40',
        colorClass,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
