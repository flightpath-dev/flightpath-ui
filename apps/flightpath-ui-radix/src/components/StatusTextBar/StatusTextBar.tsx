import { MavSeverity } from '@flightpath/flightpath/gen/ts/flightpath/statustext_pb.js';

import { useStatusText } from '../../providers/useServices';
import { MessageBar } from '../MessageBar/MessageBar';

import type { Severity } from '../../types/Severity';
import type { Message } from '../MessageBar/MessageBar';
import type { StatusText } from '@flightpath/flightpath/gen/ts/flightpath/statustext_pb.js';

function mavSeverityToSeverity(mavSeverity: MavSeverity): Severity {
  switch (mavSeverity) {
    case MavSeverity.EMERGENCY:
    case MavSeverity.ALERT:
    case MavSeverity.CRITICAL:
    case MavSeverity.ERROR:
      return 'error';
    case MavSeverity.WARNING:
      return 'warning';
    case MavSeverity.NOTICE:
    case MavSeverity.INFO:
    case MavSeverity.DEBUG:
    default:
      return 'info';
  }
}

function statusTextToMessage(statusText: StatusText): Message {
  return {
    severity: mavSeverityToSeverity(statusText.severity),
    text: statusText.text ?? '',
    timestamp: new Date(),
  };
}

export function StatusTextBar() {
  const statusText = useStatusText();
  const message = statusText ? statusTextToMessage(statusText) : null;

  return <MessageBar message={message} />;
}
