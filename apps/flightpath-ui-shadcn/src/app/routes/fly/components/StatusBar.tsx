import { MessageBar } from '@flightpath/autopilot/components/MessageBar';

import { useStatusMessage } from '../../../../providers/useServices';

export function StatusBar() {
  const message = useStatusMessage();

  return <MessageBar message={message} />;
}
