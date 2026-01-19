import { Flex, Text } from '@radix-ui/themes';
import { ArrowUp, Home, Play } from 'lucide-react';

import { MissionStartDialog } from './MissionStartDialog';
import { TakeoffDialog } from './TakeoffDialog';
import {
  useFlightStatus,
  useMissionCurrent,
} from '../../providers/useServices';

import styles from './FlightCommandPanel.module.css';

interface FlightCommandPanelProps {
  className?: string;
  disabled?: boolean;
  onTakeoff: (altitudeFt: number) => void;
  onMissionStart: () => void;
  onReturn: () => void;
}

export default function FlightCommandPanel({
  className,
  disabled = false,
  onTakeoff,
  onReturn,
  onMissionStart,
}: FlightCommandPanelProps) {
  const { state: flightState } = useFlightStatus();
  const missionCurrent = useMissionCurrent();

  const isMissionLoaded =
    missionCurrent !== null && missionCurrent.missionId > 0;

  const isMissionActive =
    isMissionLoaded && (flightState === 'flying' || flightState === 'landing');

  const missionProgress = isMissionLoaded
    ? `Step ${(missionCurrent.seq ?? 0) + 1} / ${missionCurrent.total ?? 0}`
    : undefined;

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

      <MissionStartDialog
        missionCurrent={missionCurrent}
        onMissionStart={onMissionStart}
        trigger={
          <button
            className={`${styles.button} ${
              isMissionActive
                ? styles.missionButtonActive
                : isMissionLoaded
                  ? styles.missionButtonLoaded
                  : ''
            }`}
            disabled={disabled || !isMissionLoaded}
          >
            <Flex align="center" direction="column" gap="1">
              <Play size={24} />
              <Text
                className={`${styles.label} ${
                  isMissionActive
                    ? styles.missionLabelActive
                    : isMissionLoaded
                      ? styles.missionLabelLoaded
                      : ''
                }`}
                size="1"
              >
                Mission
              </Text>
              {isMissionActive && (
                <Text
                  className={`${styles.label} ${styles.missionLabelActive}`}
                  size="1"
                >
                  {missionProgress}
                </Text>
              )}
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
