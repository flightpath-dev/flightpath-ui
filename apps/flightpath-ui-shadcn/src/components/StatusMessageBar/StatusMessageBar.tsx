import { MessageBar } from '@flightpath/autopilot/components/MessageBar';

import type { Message } from '@flightpath/autopilot/components/MessageBar';

const message: Message = {
  timestamp: new Date(),
  severity: 'info',
  text: 'Takeoff detected',
};

export function StatusMessageBar() {
  return <MessageBar message={message} />;
}
