import { cva } from 'class-variance-authority';

import { cn } from '../utils/cn';

import type { VariantProps } from 'class-variance-authority';
import type { ReactNode, HTMLAttributes } from 'react';

const surfaceVariants = cva('', {
  variants: {
    color: {
      red: 'bg-red-50 text-red-700 dark:bg-red-950/70 dark:text-red-400',
      orange:
        'bg-orange-50 text-orange-700 dark:bg-orange-950/70 dark:text-orange-400',
      amber:
        'bg-amber-50 text-amber-700 dark:bg-amber-950/70 dark:text-amber-400',
      yellow:
        'bg-yellow-50 text-yellow-700 dark:bg-yellow-950/70 dark:text-yellow-400',
      lime: 'bg-lime-50 text-lime-700 dark:bg-lime-950/70 dark:text-lime-400',
      green:
        'bg-green-50 text-green-700 dark:bg-green-950/70 dark:text-green-400',
      emerald:
        'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-400',
      teal: 'bg-teal-50 text-teal-700 dark:bg-teal-950/70 dark:text-teal-400',
      cyan: 'bg-cyan-50 text-cyan-700 dark:bg-cyan-950/70 dark:text-cyan-400',
      sky: 'bg-sky-50 text-sky-700 dark:bg-sky-950/70 dark:text-sky-400',
      blue: 'bg-blue-50 text-blue-700 dark:bg-blue-950/70 dark:text-blue-400',
      indigo:
        'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-400',
      violet:
        'bg-violet-50 text-violet-700 dark:bg-violet-950/70 dark:text-violet-400',
      purple:
        'bg-purple-50 text-purple-700 dark:bg-purple-950/70 dark:text-purple-400',
      fuchsia:
        'bg-fuchsia-50 text-fuchsia-700 dark:bg-fuchsia-950/70 dark:text-fuchsia-400',
      pink: 'bg-pink-50 text-pink-700 dark:bg-pink-950/70 dark:text-pink-400',
      rose: 'bg-rose-50 text-rose-700 dark:bg-rose-950/70 dark:text-rose-400',
      // ---------- slightly elevated background than the default ----------
      slate:
        'bg-slate-100 text-slate-700 dark:bg-slate-800/70 dark:text-slate-400',
      gray: 'bg-gray-100 text-gray-700 dark:bg-gray-800/70 dark:text-gray-400',
      zinc: 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800/70 dark:text-zinc-400',
      neutral:
        'bg-neutral-100 text-neutral-700 dark:bg-neutral-800/70 dark:text-neutral-400',
      stone:
        'bg-stone-100 text-stone-700 dark:bg-stone-800/70 dark:text-stone-400',
      // -------------------------------------------------------------------
    },
  },
  defaultVariants: {
    color: 'gray',
  },
});

export interface SurfaceProps extends HTMLAttributes<HTMLElement> {
  className?: string;
  children: ReactNode;
}

export function Surface({
  className,
  children,
  color,
  ...props
}: SurfaceProps & VariantProps<typeof surfaceVariants>) {
  return (
    <div className={cn(surfaceVariants({ color }), className)} {...props}>
      {children}
    </div>
  );
}
