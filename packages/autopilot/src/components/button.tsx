import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva } from 'class-variance-authority';

import { cn } from '../lib/utils';

import type { VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'ap:focus-visible:border-ring ap:focus-visible:ring-ring/30 ap:aria-invalid:ring-destructive/20 ap:dark:aria-invalid:ring-destructive/40 ap:aria-invalid:border-destructive ap:dark:aria-invalid:border-destructive/50 ap:rounded-md ap:border ap:border-transparent ap:bg-clip-padding ap:text-xs/relaxed ap:font-medium ap:focus-visible:ring-[2px] ap:aria-invalid:ring-[2px] ap:[&_svg:not([class*=size-])]:size-4 ap:inline-flex ap:items-center ap:justify-center ap:whitespace-nowrap ap:transition-all ap:disabled:pointer-events-none ap:disabled:opacity-50 ap:[&_svg]:pointer-events-none ap:shrink-0 ap:[&_svg]:shrink-0 ap:outline-none ap:group/button ap:select-none',
  {
    variants: {
      variant: {
        default:
          'ap:bg-primary ap:text-primary-foreground ap:hover:bg-primary/80',
        outline:
          'ap:border-border ap:dark:bg-input/30 ap:hover:bg-input/50 ap:hover:text-foreground ap:aria-expanded:bg-muted ap:aria-expanded:text-foreground',
        secondary:
          'ap:bg-secondary ap:text-secondary-foreground ap:hover:bg-secondary/80 ap:aria-expanded:bg-secondary ap:aria-expanded:text-secondary-foreground',
        ghost:
          'ap:hover:bg-muted ap:hover:text-foreground ap:dark:hover:bg-muted/50 ap:aria-expanded:bg-muted ap:aria-expanded:text-foreground',
        destructive:
          'ap:bg-destructive/10 ap:hover:bg-destructive/20 ap:focus-visible:ring-destructive/20 ap:dark:focus-visible:ring-destructive/40 ap:dark:bg-destructive/20 ap:text-destructive ap:focus-visible:border-destructive/40 ap:dark:hover:bg-destructive/30',
        link: 'ap:text-primary ap:underline-offset-4 ap:hover:underline',
      },
      size: {
        default:
          'ap:h-7 ap:gap-1 ap:px-2 ap:text-xs/relaxed ap:has-data-[icon=inline-end]:pr-1.5 ap:has-data-[icon=inline-start]:pl-1.5 ap:[&_svg:not([class*=size-])]:size-3.5',
        xs: 'ap:h-5 ap:gap-1 ap:rounded-sm ap:px-2 ap:text-[0.625rem] ap:has-data-[icon=inline-end]:pr-1.5 ap:has-data-[icon=inline-start]:pl-1.5 ap:[&_svg:not([class*=size-])]:size-2.5',
        sm: 'ap:h-6 ap:gap-1 ap:px-2 ap:text-xs/relaxed ap:has-data-[icon=inline-end]:pr-1.5 ap:has-data-[icon=inline-start]:pl-1.5 ap:[&_svg:not([class*=size-])]:size-3',
        lg: 'ap:h-8 ap:gap-1 ap:px-2.5 ap:text-xs/relaxed ap:has-data-[icon=inline-end]:pr-2 ap:has-data-[icon=inline-start]:pl-2 ap:[&_svg:not([class*=size-])]:size-4',
        icon: 'ap:size-7 ap:[&_svg:not([class*=size-])]:size-3.5',
        'icon-xs':
          'ap:size-5 ap:rounded-sm ap:[&_svg:not([class*=size-])]:size-2.5',
        'icon-sm': 'ap:size-6 ap:[&_svg:not([class*=size-])]:size-3',
        'icon-lg': 'ap:size-8 ap:[&_svg:not([class*=size-])]:size-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants };
