import { memo } from 'react';

import { CommandButton } from '@flightpath/autopilot/components/CommandButton';
import { Separator } from '@flightpath/autopilot/components/Separator';
import { cn } from '@flightpath/autopilot/utils/cn';
import { ArrowUp, Home, Play } from 'lucide-react';

import { MissionStartDialog } from './MissionStartDialog';
import { TakeoffDialog } from './TakeoffDialog';
import {
  useFlightStatus,
  useMissionProgress,
} from '../../providers/useServices';

interface FlightCommandPanelProps {
  className?: string;
  disabled?: boolean;
  onTakeoff: (altitudeFt: number) => void;
  onMissionStart: () => void;
  onReturn: () => void;
}

/**
 * FlightCommandPanel component for controlling drone flight operations.
 *
 * NOTE: This component is wrapped with React.memo() as part of an
 * over-optimization example. See FlyView component for detailed explanation.
 */
function FlightCommandPanelBase({
  className,
  disabled = false,
  onTakeoff,
  onReturn,
  onMissionStart,
}: FlightCommandPanelProps) {
  const flightStatus = useFlightStatus();
  const missionProgress = useMissionProgress();

  const { state: flightState } = flightStatus;

  const isMissionLoaded = missionProgress.missionId > 0;

  const isMissionActive =
    isMissionLoaded && (flightState === 'flying' || flightState === 'landing');

  const isTakeoffDisabled = disabled || flightState !== 'readyToFly';
  const isMissionDisabled = disabled || !isMissionLoaded;
  const isReturnDisabled = disabled || flightState !== 'flying';

  const missionProgressText = isMissionLoaded
    ? `Step ${missionProgress.seq + 1}/${missionProgress.total}`
    : undefined;

  return (
    <div
      className={cn(
        'dark bg-black/90 backdrop-blur-md border rounded-md w-16 py-2 flex flex-col gap-1',
        className,
      )}
    >
      <TakeoffDialog
        onTakeoff={onTakeoff}
        trigger={
          <CommandButton
            disabled={isTakeoffDisabled}
            className="hover:bg-muted"
          >
            <ArrowUp className="size-6" />
            <span>Takeoff</span>
          </CommandButton>
        }
      />

      <Separator />

      <MissionStartDialog
        missionItemCount={missionProgress.total}
        onMissionStart={onMissionStart}
        trigger={
          <CommandButton
            disabled={isMissionDisabled}
            accent={
              isMissionActive ? 'amber' : isMissionLoaded ? 'green' : undefined
            }
            className={
              isMissionActive
                ? undefined
                : isMissionLoaded
                  ? 'hover:bg-green/10'
                  : undefined
            }
          >
            <Play className="size-6" />
            <span>Mission</span>
            {isMissionActive && (
              <span className="text-[9px] font-normal font-mono leading-none mt-0.5">
                {missionProgressText}
              </span>
            )}
          </CommandButton>
        }
      />

      <Separator />

      <CommandButton
        disabled={isReturnDisabled}
        onClick={onReturn}
        className="hover:bg-muted"
      >
        <Home className="size-6" />
        <span>Return</span>
      </CommandButton>
    </div>
  );
}

export const FlightCommandPanel = memo(FlightCommandPanelBase);
