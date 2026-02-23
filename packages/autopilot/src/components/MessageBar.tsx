import { format } from 'date-fns';
import { AlertCircle, AlertTriangle, CheckCircle, Info } from 'lucide-react';

import { cn } from '../utils/cn';
import { severityToColor } from '../utils/severityToColor';

import type { Message } from '../types/Message';
import type { Severity } from '../types/Severity';

interface MessageBarProps {
  message: Message | null;
  className?: string;
}

function getIcon(severity: Severity) {
  switch (severity) {
    case 'info':
      return <Info className="w-4 h-4" />;
    case 'success':
      return <CheckCircle className="w-4 h-4" />;
    case 'warning':
      return <AlertTriangle className="w-4 h-4" />;
    case 'error':
      return <AlertCircle className="w-4 h-4" />;
  }
}

export function MessageBar({ message, className }: MessageBarProps) {
  const colors = severityToColor(message ? message.severity : 'info');

  return (
    <div className={cn(colors.bgContrast, colors.textContrast, className)}>
      <div className={cn('flex items-center gap-3 px-6 h-9', colors.text)}>
        {message && (
          <>
            <div>{getIcon(message.severity)}</div>
            <span className="text-xs font-mono">
              {format(message.timestamp, 'HH:mm:ss')}
            </span>
            <div className="w-px h-4 bg-white/10" />
            <span className="text-sm truncate flex-1">{message.text}</span>
          </>
        )}
      </div>
    </div>
  );
}
