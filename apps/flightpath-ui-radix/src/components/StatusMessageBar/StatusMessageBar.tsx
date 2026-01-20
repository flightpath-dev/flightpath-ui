import { useStatusMessage } from '../../providers/useServices';
import { MessageBar } from '../MessageBar/MessageBar';

export function StatusMessageBar() {
  const message = useStatusMessage();

  return <MessageBar message={message} />;
}
