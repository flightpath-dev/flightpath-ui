import { cn } from '../utils/cn';

import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

interface IconTextProps {
  icon: LucideIcon;
  children: ReactNode;
  iconSize?: string;
  textSize?: string;
  mono?: boolean;
}

export function IconText({
  icon: Icon,
  children,
  iconSize = 'size-4',
  textSize = 'text-sm',
  mono = false,
}: IconTextProps) {
  return (
    <div className="flex items-center gap-2">
      <Icon className={iconSize} />
      <span className={cn(mono ? 'font-mono' : undefined, textSize)}>
        {children}
      </span>
    </div>
  );
}
