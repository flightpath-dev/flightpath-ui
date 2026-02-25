import {
  Button,
  ButtonSizeEnum,
  ButtonVariantEnum,
} from '@flightpath/autopilot/components/Button';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';

import type { Meta, StoryObj } from '@storybook/react-vite';

const docDescription = `
Displays a button or a component that looks like a button.

\`\`\`tsx
import { Button } from '@flightpath/autopilot/components/Button';
\`\`\`
`;

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: {
      description: { component: docDescription },
    },
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [undefined, ...Object.values(ButtonVariantEnum)],
      description: 'The visual variant of the button',
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: 'ButtonVariant | undefined' },
      },
    },
    size: {
      control: 'select',
      options: [undefined, ...Object.values(ButtonSizeEnum)],
      description: 'The size of the button',
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: 'ButtonSize | undefined' },
      },
    },
    disabled: {
      control: 'select',
      options: [undefined, true],
      description: 'Whether the button should be disabled',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'boolean | undefined' },
      },
    },
    children: {
      control: 'text',
      description: 'The content to display inside the component',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'React.ReactNode' },
      },
    },
  },
  /*
   * 1. Default values to be used by stories unless overridden.
   * 2. Forces the order of controls shown in the control table.
   */
  args: {
    children: 'Button',

    variant: undefined,
    size: undefined,
    disabled: undefined,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/*
 * 1. This story has no args defined – it will use the default args from the meta object.
 * 2. This story specifies sourceState of "hidden" which enables the Show/Hide Code button.
 * 3. Avoid enabling this button on stories with render() – Storybook shows unclean compiled jsx.
 */
export const Default: Story = {
  parameters: { docs: { canvas: { sourceState: 'hidden' } } },
};

export const ButtonVariants: Story = {
  name: 'Variants',
  render: () => (
    <div className="flex flex-wrap gap-2">
      {Object.values(ButtonVariantEnum).map((variant) => (
        <Button key={variant} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  ),
};

export const ButtonIconRight: Story = {
  name: 'Icon Right',
  render: () => (
    <div className="flex flex-wrap gap-2">
      {Object.values(ButtonVariantEnum).map((variant) => (
        <Button key={variant} variant={variant}>
          {variant} <ArrowRightIcon />
        </Button>
      ))}
    </div>
  ),
};

export const ButtonIconLeft: Story = {
  name: 'Icon Left',
  render: () => (
    <div className="flex flex-wrap gap-2">
      {Object.values(ButtonVariantEnum).map((variant) => (
        <Button key={variant} variant={variant}>
          <ArrowLeftIcon /> {variant}
        </Button>
      ))}
    </div>
  ),
};

export const ButtonIconOnly: Story = {
  name: 'Icon Only',
  render: () => (
    <div className="flex flex-wrap gap-2">
      {Object.values(ButtonVariantEnum).map((variant) => (
        <Button key={variant} variant={variant} size="icon">
          <ArrowRightIcon />
        </Button>
      ))}
    </div>
  ),
};

export const ButtonSizes: Story = {
  name: 'Sizes',
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button size="xs">xs</Button>
      <Button size="sm">sm</Button>
      <Button size="default">default</Button>
      <Button size="lg">lg</Button>
    </div>
  ),
};

export const ButtonIconSizes: Story = {
  name: 'Icon Sizes',
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button size="icon-xs">
        <ArrowRightIcon />
      </Button>
      <Button size="icon-sm">
        <ArrowRightIcon />
      </Button>
      <Button size="icon">
        <ArrowRightIcon />
      </Button>
      <Button size="icon-lg">
        <ArrowRightIcon />
      </Button>
    </div>
  ),
};
