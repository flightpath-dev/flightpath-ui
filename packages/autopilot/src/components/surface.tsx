import { cva } from 'class-variance-authority';

import { cn } from '../lib/utils';

import type { VariantProps } from 'class-variance-authority';
import type { ReactNode, HTMLAttributes } from 'react';

const surfaceVariants = cva('', {
  variants: {
    color: {
      red: 'bg-red-50 text-red-700 dark:bg-red-950/70 dark:text-red-300',
      orange:
        'bg-orange-50 text-orange-700 dark:bg-orange-950/70 dark:text-orange-300',
      amber:
        'bg-amber-50 text-amber-700 dark:bg-amber-950/70 dark:text-amber-300',
      yellow:
        'bg-yellow-50 text-yellow-700 dark:bg-yellow-950/70 dark:text-yellow-300',
      lime: 'bg-lime-50 text-lime-700 dark:bg-lime-950/70 dark:text-lime-300',
      green:
        'bg-green-50 text-green-700 dark:bg-green-950/70 dark:text-green-300',
      emerald:
        'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300',
      teal: 'bg-teal-50 text-teal-700 dark:bg-teal-950/70 dark:text-teal-300',
      cyan: 'bg-cyan-50 text-cyan-700 dark:bg-cyan-950/70 dark:text-cyan-300',
      sky: 'bg-sky-50 text-sky-700 dark:bg-sky-950/70 dark:text-sky-300',
      blue: 'bg-blue-50 text-blue-700 dark:bg-blue-950/70 dark:text-blue-300',
      indigo:
        'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-300',
      violet:
        'bg-violet-50 text-violet-700 dark:bg-violet-950/70 dark:text-violet-300',
      purple:
        'bg-purple-50 text-purple-700 dark:bg-purple-950/70 dark:text-purple-300',
      fuchsia:
        'bg-fuchsia-50 text-fuchsia-700 dark:bg-fuchsia-950/70 dark:text-fuchsia-300',
      pink: 'bg-pink-50 text-pink-700 dark:bg-pink-950/70 dark:text-pink-300',
      rose: 'bg-rose-50 text-rose-700 dark:bg-rose-950/70 dark:text-rose-300',
      slate:
        'bg-slate-50 text-slate-700 dark:bg-slate-950/70 dark:text-slate-300',
      gray: 'bg-gray-50 text-gray-700 dark:bg-gray-950/70 dark:text-gray-300',
      zinc: 'bg-zinc-50 text-zinc-700 dark:bg-zinc-950/70 dark:text-zinc-300',
      neutral:
        'bg-neutral-50 text-neutral-700 dark:bg-neutral-950/70 dark:text-neutral-300',
      neutralElevation1:
        'bg-neutral-50 text-neutral-700 dark:bg-neutral-800/70 dark:text-neutral-300',
      stone:
        'bg-stone-50 text-stone-700 dark:bg-stone-950/70 dark:text-stone-300',
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
