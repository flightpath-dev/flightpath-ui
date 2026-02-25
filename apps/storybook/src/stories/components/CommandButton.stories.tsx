import { CommandButton } from '@flightpath/autopilot/components/CommandButton';
import { Separator } from '@flightpath/autopilot/components/Separator';
import { AccentEnum } from '@flightpath/autopilot/types/Accent';
import { ArrowUp, Home, Play } from 'lucide-react';

import type { Accent } from '@flightpath/autopilot/types/Accent';
import type { Meta, StoryObj } from '@storybook/react-vite';

const docDescription = `
A compact button for command panels: icon + label, optional accent color. Used in FlightCommandPanel for Takeoff, Mission, and Return actions.

\`\`\`tsx
import { CommandButton } from '@flightpath/autopilot/components/CommandButton';
\`\`\`
`;

const meta = {
  title: 'Components/CommandButton',
  component: CommandButton,
  parameters: {
    docs: {
      description: { component: docDescription },
    },
    layout: 'centered',
  },
  argTypes: {
    accent: {
      control: 'select',
      options: Object.values(AccentEnum),
      description: 'Accent color for the button text',
      table: {
        defaultValue: { summary: 'neutral' },
        type: { summary: 'Accent' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    children: {
      table: { type: { summary: 'ReactNode' } },
    },
  },
  args: {
    children: <Play className="size-6" />,

    accent: 'neutral',
    disabled: false,
  },
} satisfies Meta<typeof CommandButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: { docs: { canvas: { sourceState: 'hidden' } } },
};

export const Accents: Story = {
  render: (args) => (
    <div className="dark w-16 rounded-lg border border-border bg-card/90 py-2 backdrop-blur-md">
      <div className="flex flex-col gap-1">
        {(['neutral', 'green', 'amber'] as Accent[]).map((accent) => (
          <CommandButton
            key={accent}
            {...args}
            accent={accent}
            className="hover:bg-muted"
          >
            <Play className="size-6" />
            <span>{accent}</span>
          </CommandButton>
        ))}
      </div>
    </div>
  ),
  args: {},
};

export const FlightCommandPanelStyle: Story = {
  render: () => (
    <div className="dark w-16 flex flex-col gap-1 rounded-lg border border-border bg-card/90 py-2 backdrop-blur-md">
      <CommandButton disabled className="hover:bg-muted">
        <ArrowUp className="size-6" />
        <span>Takeoff</span>
      </CommandButton>
      <Separator />
      <CommandButton accent="amber" className="hover:bg-green/10">
        <Play className="size-6" />
        <span>Mission</span>
        <span className="mt-0.5 font-mono text-[9px] font-normal leading-none">
          Step 2/5
        </span>
      </CommandButton>
      <Separator />
      <CommandButton className="hover:bg-muted">
        <Home className="size-6" />
        <span>Return</span>
      </CommandButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'CommandButtons in a dark panel with separators, matching FlightCommandPanel layout and styling.',
      },
    },
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="dark w-16 flex flex-col gap-1 rounded-lg border border-border bg-card/90 py-2 backdrop-blur-md">
      <CommandButton disabled className="hover:bg-muted">
        <ArrowUp className="size-6" />
        <span>Takeoff</span>
      </CommandButton>
      <Separator />
      <CommandButton disabled className="hover:bg-green/10">
        <Play className="size-6" />
        <span>Mission</span>
        <span className="mt-0.5 font-mono text-[9px] font-normal leading-none">
          Step 2/5
        </span>
      </CommandButton>
      <Separator />
      <CommandButton disabled className="hover:bg-muted">
        <Home className="size-6" />
        <span>Return</span>
      </CommandButton>
    </div>
  ),
};
