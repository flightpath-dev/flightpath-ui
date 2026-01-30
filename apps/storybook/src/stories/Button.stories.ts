import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  Button,
  ButtonSizeEnum,
  ButtonVariantEnum,
} from '@flightpath/autopilot/components/Button';

const content = 'Button text';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
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
    children: content,
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
