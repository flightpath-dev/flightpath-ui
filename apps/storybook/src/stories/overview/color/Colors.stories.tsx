import { AccentEnum } from '@flightpath/autopilot/types/Accent';
import { accentToColor } from '@flightpath/autopilot/utils/accentToColor';
import { cn } from '@flightpath/autopilot/utils/cn';

import type { Accent } from '@flightpath/autopilot/types/Accent';
import type { Meta, StoryObj } from '@storybook/react-vite';

const docDescription = `
Semantic color tokens from \`globals.css\`. Each swatch shows the background and text color it is rendered with.
`;

const shadcnColors = [
  { bg: 'bg-background', text: 'text-foreground' },
  { bg: 'bg-card', text: 'text-card-foreground' },
  { bg: 'bg-popover', text: 'text-popover-foreground' },
  { bg: 'bg-primary', text: 'text-primary-foreground' },
  { bg: 'bg-secondary', text: 'text-secondary-foreground' },
  { bg: 'bg-muted', text: 'text-muted-foreground' },
  { bg: 'bg-accent', text: 'text-accent-foreground' },
  { bg: 'bg-destructive/10 dark:bg-destructive/20', text: 'text-destructive' },
  { bg: 'bg-background', text: 'text-destructive' },
  { bg: 'bg-background', text: 'text-primary' },
] as const;

const severityColors = [
  { bg: 'bg-info', text: 'text-info-foreground' },
  { bg: 'bg-success', text: 'text-success-foreground' },
  { bg: 'bg-warning', text: 'text-warning-foreground' },
  { bg: 'bg-error', text: 'text-error-foreground' },
  { bg: 'bg-background', text: 'text-foreground' },
  { bg: 'bg-background', text: 'text-success' },
  { bg: 'bg-background', text: 'text-warning' },
  { bg: 'bg-background', text: 'text-error' },
] as const;

const accents = Object.values(AccentEnum) as Accent[];

const accentColors = [
  ...accents.map((accent) => {
    const colors = accentToColor(accent);
    return {
      key: `accent-${accent}`,
      label: accent,
      bg: colors.bgContrast,
      text: colors.textContrast,
    };
  }),
  ...accents.map((accent) => {
    const colors = accentToColor(accent);
    return {
      key: `bg-${accent}`,
      label: accent,
      bg: 'bg-background',
      text: colors.text,
    };
  }),
];

// ------------------------------------------------------------
// ColorSwatch component
// ------------------------------------------------------------
interface ColorSwatchProps {
  bg: string;
  text: string;
  bgLabel: string;
  textLabel: string;
}

function ColorSwatch({ bg, text, bgLabel, textLabel }: ColorSwatchProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-lg h-16',
        bg,
      )}
    >
      <span className={cn('font-mono text-sm', text)}>{bgLabel}</span>
      <span className={cn('font-mono text-sm', text)}>{textLabel}</span>
    </div>
  );
}

const meta = {
  title: 'Overview/Colors',
  parameters: {
    docs: {
      description: { component: docDescription },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const ShadcnColors: Story = {
  render: () => (
    <div className="flex flex-col max-w-sm gap-3">
      {shadcnColors.map(({ bg, text }) => (
        <ColorSwatch
          key={`${bg}-${text}`}
          bg={bg}
          text={text}
          bgLabel={bg}
          textLabel={text}
        />
      ))}
    </div>
  ),
};

export const SeverityColors: Story = {
  render: () => (
    <div className="flex flex-col max-w-sm gap-3">
      {severityColors.map(({ bg, text }) => (
        <ColorSwatch
          key={`${bg}-${text}`}
          bg={bg}
          text={text}
          bgLabel={bg}
          textLabel={text}
        />
      ))}
    </div>
  ),
};

export const AccentColors: Story = {
  render: () => (
    <div className="flex flex-col max-w-sm gap-3">
      {accentColors.map(({ bg, text }) => (
        <ColorSwatch
          key={`${bg}-${text}`}
          bg={bg}
          text={text}
          bgLabel={bg}
          textLabel={text}
        />
      ))}
    </div>
  ),
};
