import { AlertDialog, Button, Flex, Text } from '@radix-ui/themes';
import { ArrowUp, Home } from 'lucide-react';

import type { FlightState } from '../../types/FlightStatus';

import styles from './FlightCommandPanel.module.css';

interface FlightCommandPanelProps {
  flightState: FlightState;
  onTakeoff: () => void;
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
      <AlertDialog.Root>
        <AlertDialog.Trigger>
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
        </AlertDialog.Trigger>
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>Clear for Takeoff?</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Confirm that the drone is outdoors with clear airspace above it. The
            drone will take off immediately upon confirmation.
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button variant="solid" color="red" onClick={onTakeoff}>
                Takeoff
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

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
