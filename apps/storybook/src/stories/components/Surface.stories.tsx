import { Surface } from '@flightpath/autopilot/components/Surface';
import { AccentEnum } from '@flightpath/autopilot/types/Accent';

import type { Accent } from '@flightpath/autopilot/types/Accent';
import type { Meta, StoryObj } from '@storybook/react-vite';

const docDescription = `
A surface container with optional accent coloring. Use \`contrast\` for a filled accent background with contrasting text; omit it for card background with accent-colored text.

\`\`\`tsx
import { Surface } from '@flightpath/autopilot/components/Surface';
\`\`\`
`;

const meta = {
  title: 'Components/Surface',
  component: Surface,
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
      description: 'Accent color for the surface',
      table: {
        defaultValue: { summary: 'neutral' },
        type: { summary: 'Accent' },
      },
    },
    contrast: {
      control: 'boolean',
      description:
        'When true, uses accent background with contrasting text; when false, uses card background with accent text',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    children: {
      control: 'text',
      description: 'Content to render inside the surface',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes applied to the root element',
      table: {
        type: { summary: 'string' },
      },
    },
  },
  args: {
    accent: 'neutral',
    contrast: false,
    children: 'This is a surface with some content',
    className: 'p-2',
  },
} satisfies Meta<typeof Surface>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Accents: Story = {
  render: (args) => (
    <div className="flex w-full max-w-md flex-col gap-3">
      {(Object.values(AccentEnum) as Accent[]).map((accent) => (
        <Surface key={accent} {...args} accent={accent} className="p-2">
          Surface with accent = {accent}
        </Surface>
      ))}
    </div>
  ),
  args: { contrast: false },
};

export const AccentsWithContrast: Story = {
  render: (args) => (
    <div className="flex w-full max-w-md flex-col gap-3">
      {(Object.values(AccentEnum) as Accent[]).map((accent) => (
        <Surface
          key={accent}
          {...args}
          accent={accent}
          className="p-2"
          contrast
        >
          Surface with accent = {accent}
        </Surface>
      ))}
    </div>
  ),
};
