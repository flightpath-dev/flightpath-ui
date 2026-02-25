import { MessageBar } from '@flightpath/autopilot/components/MessageBar';
import { SeverityEnum } from '@flightpath/autopilot/types/Severity';

import type { Message } from '@flightpath/autopilot/types/Message';
import type { Meta, StoryObj } from '@storybook/react-vite';

const docDescription = `
Displays a message in a colored bar with icon, timestamp, and text. Uses severity-based styling (info, success, warning, error).

\`\`\`tsx
import { MessageBar } from '@flightpath/autopilot/components/MessageBar';
\`\`\`
`;

const meta = {
  title: 'Components/MessageBar',
  component: MessageBar,
  parameters: {
    docs: {
      description: { component: docDescription },
    },
    layout: 'centered',
  },
  argTypes: {
    message: {
      description: 'The message to display, or null for an empty bar',
      table: {
        type: { summary: 'Message | null' },
      },
    },
  },
  args: {
    message: {
      timestamp: new Date('2025-02-22T14:30:00'),
      severity: 'info',
      text: 'System ready. All checks passed.',
    },
  },
} satisfies Meta<typeof MessageBar>;

export default meta;
type Story = StoryObj<typeof meta>;

function message(
  severity: (typeof SeverityEnum)[keyof typeof SeverityEnum],
  text: string,
  timestamp = new Date(),
): Message {
  return { timestamp, severity, text };
}

export const Default: Story = {
  parameters: { docs: { canvas: { sourceState: 'hidden' } } },
};

export const Severities: Story = {
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-2">
      <MessageBar
        message={message(SeverityEnum.Info, 'Information message.')}
      />
      <MessageBar
        message={message(SeverityEnum.Success, 'Operation completed.')}
      />
      <MessageBar
        message={message(SeverityEnum.Warning, 'Please review settings.')}
      />
      <MessageBar message={message(SeverityEnum.Error, 'Connection failed.')} />
    </div>
  ),
};
