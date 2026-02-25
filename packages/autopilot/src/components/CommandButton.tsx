import { accentToColor } from '../utils/accentToColor';
import { cn } from '../utils/cn';

import type { Accent } from '../types/Accent';

interface CommandButtonProps extends React.ComponentProps<'button'> {
  accent?: Accent;
}

export function CommandButton({
  accent = 'neutral',
  className,
  children,
  ...props
}: CommandButtonProps) {
  const colors = accentToColor(accent);

  return (
    <button
      className={cn(
        'w-full py-3 flex flex-col items-center justify-center gap-1 transition-all text-[10px] font-medium leading-tight disabled:pointer-events-none disabled:opacity-40',
        colors.text,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
