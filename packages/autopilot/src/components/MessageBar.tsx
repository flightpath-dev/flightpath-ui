import { format } from 'date-fns';
import { Info, AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react';

import { Surface } from './surface';
import { severityToColor } from '../lib/severityToColor';

import type { Severity } from '../types/Severity';

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
      return <AlertCircle className="w-4 h-4" />;
    case 'warning':
      return <AlertTriangle className="w-4 h-4" />;
    case 'success':
      return <CheckCircle className="w-4 h-4" />;
    case 'info':
    default:
      return <Info className="w-4 h-4" />;
  }
}

export function MessageBar({ message }: MessageBarProps) {
  return (
    <Surface color={severityToColor(message?.severity ?? 'info')}>
      <div className="flex items-center gap-3 h-8 px-6">
        {message ? (
          <>
            {getIcon(message.severity)}
            <span className="text-xs opacity-60 font-mono">
              {format(message.timestamp, 'HH:mm:ss')}
            </span>
            <div className="w-px h-4 bg-border" />
            <span className="text-sm truncate flex-1">{message.text}</span>
          </>
        ) : null}
      </div>
    </Surface>
  );
}
