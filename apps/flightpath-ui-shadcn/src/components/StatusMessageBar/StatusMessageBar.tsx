import { MessageBar } from '../MessageBar/MessageBar';

import type { Message } from '../MessageBar/MessageBar';

const message: Message = {
  timestamp: new Date(),
  severity: 'info',
  text: 'This is a test message',
};

export function StatusMessageBar() {
  return <MessageBar message={message} />;
}
