import { MetricDisplay } from '@flightpath/autopilot/components/MetricDisplay';
import { SeverityEnum } from '@flightpath/autopilot/types/Severity';
import { ActivityIcon, GaugeIcon, ThermometerIcon } from 'lucide-react';

import type { Meta, StoryObj } from '@storybook/react-vite';

const docDescription = `
Displays a metric with an optional label, value, unit, and icon. Supports severity-based styling.

\`\`\`tsx
import { MetricDisplay } from '@flightpath/autopilot/components/MetricDisplay';
\`\`\`
`;

const meta = {
  title: 'Components/MetricDisplay',
  component: MetricDisplay,
  parameters: {
    docs: {
      description: { component: docDescription },
    },
    layout: 'centered',
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'The label shown above the value',
      table: {
        type: { summary: 'string' },
      },
    },
    value: {
      control: 'text',
      description: 'The value to display',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    unit: {
      control: 'text',
      description: 'Optional unit shown after the value',
      table: {
        type: { summary: 'string | undefined' },
      },
    },
    severity: {
      control: 'select',
      options: Object.values(SeverityEnum),
      description: 'Severity used for color styling',
      table: {
        defaultValue: { summary: 'info' },
        type: { summary: 'Severity' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
      table: {
        type: { summary: 'string | undefined' },
      },
    },
  },
  args: {
    label: 'Altitude',
    value: '125.4',
    unit: 'm',
    severity: SeverityEnum.Info,
  },
} satisfies Meta<typeof MetricDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: { docs: { canvas: { sourceState: 'hidden' } } },
};

export const Severities: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6">
      {Object.values(SeverityEnum).map((severity) => (
        <MetricDisplay
          key={severity}
          label="Metric"
          value="42.0"
          unit="m"
          severity={severity}
        />
      ))}
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6">
      <MetricDisplay
        label="Altitude"
        value="125.4"
        unit="m"
        icon={GaugeIcon}
        severity={SeverityEnum.Info}
      />
      <MetricDisplay
        label="Speed"
        value="12.3"
        unit="m/s"
        icon={ActivityIcon}
        severity={SeverityEnum.Success}
      />
      <MetricDisplay
        label="Temperature"
        value="45"
        unit="°C"
        icon={ThermometerIcon}
        severity={SeverityEnum.Warning}
      />
    </div>
  ),
};

export const WithoutUnit: Story = {
  render: () => (
    <MetricDisplay
      label="Status"
      value="Connected"
      severity={SeverityEnum.Success}
    />
  ),
};

export const NumberValue: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6">
      <MetricDisplay label="Count" value={2} />
      <MetricDisplay label="Altitude" value={125} unit="m" />
      <MetricDisplay label="Speed" value={12.34} unit="m/s" />
    </div>
  ),
};
