import type { AccentColor } from '../types/AccentColor';

export function accentToBgColor(color: AccentColor) {
  switch (color) {
    case 'red':
      return 'bg-red-50 dark:bg-red-950/70';
    case 'orange':
      return 'bg-orange-50 dark:bg-orange-950/70';
    case 'amber':
      return 'bg-amber-50 dark:bg-amber-950/70';
    case 'yellow':
      return 'bg-yellow-50 dark:bg-yellow-950/70';
    case 'lime':
      return 'bg-lime-50 dark:bg-lime-950/70';
    case 'green':
      return 'bg-green-50 dark:bg-green-950/70';
    case 'emerald':
      return 'bg-emerald-50 dark:bg-emerald-950/70';
    case 'teal':
      return 'bg-teal-50 dark:bg-teal-950/70';
    case 'cyan':
      return 'bg-cyan-50 dark:bg-cyan-950/70';
    case 'sky':
      return 'bg-sky-50 dark:bg-sky-950/70';
    case 'blue':
      return 'bg-blue-50 dark:bg-blue-950/70';
    case 'indigo':
      return 'bg-indigo-50 dark:bg-indigo-950/70';
    case 'violet':
      return 'bg-violet-50 dark:bg-violet-950/70';
    case 'purple':
      return 'bg-purple-50 dark:bg-purple-950/70';
    case 'fuchsia':
      return 'bg-fuchsia-50 dark:bg-fuchsia-950/70';
    case 'pink':
      return 'bg-pink-50 dark:bg-pink-950/70';
    case 'rose':
      return 'bg-rose-50 dark:bg-rose-950/70';
    // ---------- slightly elevated background than the default ----------
    case 'slate':
      return 'bg-slate-100 dark:bg-slate-800/70';
    case 'gray':
      return 'bg-gray-100 dark:bg-gray-800/70';
    case 'zinc':
      return 'bg-zinc-100 dark:bg-zinc-800/70';
    case 'neutral':
      return 'bg-neutral-100 dark:bg-neutral-800/70';
    case 'stone':
      return 'bg-stone-100 dark:bg-stone-800/70';
    // -------------------------------------------------------------------
  }
}

export function accentToTextColor(
  color: AccentColor,
  highContrast: boolean = false,
) {
  switch (color) {
    case 'red':
      return 'text-red-700 dark:text-red-400';
    case 'orange':
      return 'text-orange-700 dark:text-orange-400';
    case 'amber':
      return 'text-amber-700 dark:text-amber-400';
    case 'yellow':
      return 'text-yellow-700 dark:text-yellow-400';
    case 'lime':
      return 'text-lime-700 dark:text-lime-400';
    case 'green':
      return 'text-green-700 dark:text-green-400';
    case 'emerald':
      return 'text-emerald-700 dark:text-emerald-400';
    case 'teal':
      return 'text-teal-700 dark:text-teal-400';
    case 'cyan':
      return 'text-cyan-700 dark:text-cyan-400';
    case 'sky':
      return 'text-sky-700 dark:text-sky-400';
    case 'blue':
      return 'text-blue-700 dark:text-blue-400';
    case 'indigo':
      return 'text-indigo-700 dark:text-indigo-400';
    case 'violet':
      return 'text-violet-700 dark:text-violet-400';
    case 'purple':
      return 'text-purple-700 dark:text-purple-400';
    case 'fuchsia':
      return 'text-fuchsia-700 dark:text-fuchsia-400';
    case 'pink':
      return 'text-pink-700 dark:text-pink-400';
    case 'rose':
      return 'text-rose-700 dark:text-rose-400';
    // ---------- slightly elevated background than the default ----------
    case 'slate':
      return highContrast
        ? 'text-foreground'
        : 'text-slate-700 dark:text-slate-400';
    case 'gray':
      return highContrast
        ? 'text-foreground'
        : 'text-gray-700 dark:text-gray-400';
    case 'zinc':
      return highContrast
        ? 'text-foreground'
        : 'text-zinc-700 dark:text-zinc-400';
    case 'neutral':
      return highContrast
        ? 'text-foreground'
        : 'text-neutral-700 dark:text-neutral-400';
    case 'stone':
      return highContrast
        ? 'text-foreground'
        : 'text-stone-700 dark:text-stone-400';
    // -------------------------------------------------------------------
  }
}
