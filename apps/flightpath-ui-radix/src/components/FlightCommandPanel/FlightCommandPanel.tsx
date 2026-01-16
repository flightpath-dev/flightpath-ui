import { Flex, Text } from '@radix-ui/themes';
import { ArrowUp, Home } from 'lucide-react';

import { TakeoffDialog } from './TakeoffDialog';

import type { FlightState } from '../../types/FlightStatus';

import styles from './FlightCommandPanel.module.css';

interface FlightCommandPanelProps {
  flightState: FlightState;
  onTakeoff: (altitudeFt: number) => void;
  onReturn: () => void;
  className?: string;
  disabled?: boolean;
}

export default function FlightCommandPanel({
  flightState,
  onTakeoff,
  onReturn,
  className,
  disabled = false,
}: FlightCommandPanelProps) {
  return (
    <Flex
      className={`${styles.panel} ${className ?? ''}`}
      direction="column"
      gap="1"
    >
      <TakeoffDialog
        onTakeoff={onTakeoff}
        trigger={
          <button
            className={styles.button}
            disabled={disabled || flightState !== 'readyToFly'}
          >
            <Flex align="center" direction="column" gap="1">
              <ArrowUp size={24} />
              <Text className={styles.label} size="1">
                Takeoff
              </Text>
            </Flex>
          </button>
        }
      />

      <div className={styles.divider} />

      <button
        className={styles.button}
        disabled={disabled || flightState !== 'flying'}
        onClick={onReturn}
      >
        <Flex align="center" direction="column" gap="1">
          <Home size={24} />
          <Text className={styles.label} size="1">
            Return
          </Text>
        </Flex>
      </button>
    </Flex>
  );
}
