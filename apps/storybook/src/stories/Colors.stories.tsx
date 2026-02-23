import { cn } from '@flightpath/autopilot/utils/cn';

import type { Meta, StoryObj } from '@storybook/react-vite';

const docDescription = `
Semantic color tokens from \`globals.css\`. Each swatch shows the background and text color it is rendered with.
`;

/** Each entry: bg utility and the text utility for the label (paired foreground or text-white). */
const semanticSwatches = [
  { bg: 'bg-background', text: 'text-foreground' },
  { bg: 'bg-card', text: 'text-card-foreground' },
  { bg: 'bg-popover', text: 'text-popover-foreground' },
  { bg: 'bg-primary', text: 'text-primary-foreground' },
  { bg: 'bg-secondary', text: 'text-secondary-foreground' },
  { bg: 'bg-muted', text: 'text-muted-foreground' },
  { bg: 'bg-accent', text: 'text-accent-foreground' },
  { bg: 'bg-destructive/10 dark:bg-destructive/20', text: 'text-destructive' },
  { bg: 'bg-info', text: 'text-info-foreground' },
  { bg: 'bg-success', text: 'text-success-foreground' },
  { bg: 'bg-warning', text: 'text-warning-foreground' },
  { bg: 'bg-error', text: 'text-error-foreground' },
  { bg: 'bg-background', text: 'text-primary' },
  { bg: 'bg-background', text: 'text-destructive' },
  { bg: 'bg-background', text: 'text-success' },
  { bg: 'bg-background', text: 'text-warning' },
  { bg: 'bg-background', text: 'text-error' },
] as const;

const meta = {
  title: 'Design/Colors',
  parameters: {
    docs: {
      description: { component: docDescription },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const All: Story = {
  render: () => (
    <div className="flex flex-col max-w-sm gap-3">
      {semanticSwatches.map(({ bg, text }) => (
        <div
          key={bg}
          className={cn(
            'flex flex-col items-center justify-center rounded-lg h-16',
            bg,
          )}
        >
          <span className={cn('font-mono text-sm', text)}>{bg}</span>
          <span className={cn('font-mono text-sm', text)}>{text}</span>
        </div>
      ))}
    </div>
  ),
};
