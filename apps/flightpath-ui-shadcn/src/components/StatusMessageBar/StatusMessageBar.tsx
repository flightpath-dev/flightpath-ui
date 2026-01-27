import { MessageBar } from '@flightpath/autopilot/components/MessageBar';

import { useStatusMessage } from '../../providers/useServices';

export function StatusMessageBar() {
  const message = useStatusMessage();

  return <MessageBar message={message} />;
}
