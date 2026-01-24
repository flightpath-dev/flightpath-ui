import { MessageBar } from '@flightpath/autopilot/components/MessageBar';

import type { Message } from '@flightpath/autopilot/components/MessageBar';

const message: Message = {
  timestamp: new Date(),
  severity: 'warning',
  text: 'This is a test message',
};

export function StatusMessageBar() {
  return <MessageBar message={message} />;
}
