import { Flex } from '@radix-ui/themes';
import { format } from 'date-fns';
import { Info, AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react';

import { severityToColor } from '../../utils/severityToColor';
import { Surface } from '../Surface/Surface';

import type { Severity } from '../../types/Severity';

import styles from './MessageBar.module.css';

export interface Message {
  timestamp: Date;
  severity: Severity;
  text: string;
}

interface MessageBarProps {
  message: Message | null;
}

function getIcon(severity: Severity) {
  switch (severity) {
    case 'error':
      return <AlertCircle size={16} />;
    case 'warning':
      return <AlertTriangle size={16} />;
    case 'success':
      return <CheckCircle size={16} />;
    case 'info':
    default:
      return <Info size={16} />;
  }
}

export function MessageBar({ message }: MessageBarProps) {
  return (
    <Surface color={severityToColor(message?.severity ?? 'info')}>
      <Flex align="center" gap="3" height="32px" px="6">
        {message ? (
          <>
            {getIcon(message.severity)}
            <span className={styles.time}>
              {format(message.timestamp, 'HH:mm:ss')}
            </span>
            <div className={styles.divider} />
            <span className={styles.text}>{message.text}</span>
          </>
        ) : null}
      </Flex>
    </Surface>
  );
}
