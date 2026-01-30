import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva } from 'class-variance-authority';

import { cn } from '../utils/cn';

import type { VariantProps } from 'class-variance-authority';

const ButtonVariantEnum = {
  Default: 'default',
  Outline: 'outline',
  Secondary: 'secondary',
  Ghost: 'ghost',
  Destructive: 'destructive',
  Link: 'link',
} as const;

export type ButtonVariant = (typeof ButtonVariantEnum)[keyof typeof ButtonVariantEnum];

const ButtonSizeEnum = {
  Default: 'default',
  Xs: 'xs',
  Sm: 'sm',
  Lg: 'lg',
  Icon: 'icon',
  IconXs: 'icon-xs',
  IconSm: 'icon-sm',
  IconLg: 'icon-lg',
} as const;

export type ButtonSize = (typeof ButtonSizeEnum)[keyof typeof ButtonSizeEnum];

const variantStyles: Record<ButtonVariant, string> = {
  [ButtonVariantEnum.Default]: 'bg-primary text-primary-foreground hover:bg-primary/80',
  [ButtonVariantEnum.Outline]:
    'border-border dark:bg-input/30 hover:bg-input/50 hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground',
  [ButtonVariantEnum.Secondary]:
    'bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground',
  [ButtonVariantEnum.Ghost]:
    'hover:bg-muted hover:text-foreground dark:hover:bg-muted/50 aria-expanded:bg-muted aria-expanded:text-foreground',
  [ButtonVariantEnum.Destructive]:
    'bg-destructive/10 hover:bg-destructive/20 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/20 text-destructive focus-visible:border-destructive/40 dark:hover:bg-destructive/30',
  [ButtonVariantEnum.Link]: 'text-primary underline-offset-4 hover:underline',
};

const sizeStyles: Record<ButtonSize, string> = {
  [ButtonSizeEnum.Default]:
    'h-7 gap-1 px-2 text-xs/relaxed has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*=size-])]:size-3.5',
  [ButtonSizeEnum.Xs]:
    'h-5 gap-1 rounded-sm px-2 text-[0.625rem] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*=size-])]:size-2.5',
  [ButtonSizeEnum.Sm]:
    'h-6 gap-1 px-2 text-xs/relaxed has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*=size-])]:size-3',
  [ButtonSizeEnum.Lg]:
    'h-8 gap-1 px-2.5 text-xs/relaxed has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*=size-])]:size-4',
  [ButtonSizeEnum.Icon]: 'size-7 [&_svg:not([class*=size-])]:size-3.5',
  [ButtonSizeEnum.IconXs]: 'size-5 rounded-sm [&_svg:not([class*=size-])]:size-2.5',
  [ButtonSizeEnum.IconSm]: 'size-6 [&_svg:not([class*=size-])]:size-3',
  [ButtonSizeEnum.IconLg]: 'size-8 [&_svg:not([class*=size-])]:size-4',
};

const buttonVariants = cva(
  'focus-visible:border-ring focus-visible:ring-ring/30 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 rounded-md border border-transparent bg-clip-padding text-xs/relaxed font-medium focus-visible:ring-[2px] aria-invalid:ring-[2px] [&_svg:not([class*=size-])]:size-4 inline-flex items-center justify-center whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none group/button select-none',
  {
    variants: {
      variant: variantStyles,
      size: sizeStyles,
    },
    defaultVariants: {
      variant: ButtonVariantEnum.Default,
      size: ButtonSizeEnum.Default,
    },
  },
);

function Button({
  className,
  variant = ButtonVariantEnum.Default,
  size = ButtonSizeEnum.Default,
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
export { Button, ButtonSizeEnum, ButtonVariantEnum, buttonVariants };
