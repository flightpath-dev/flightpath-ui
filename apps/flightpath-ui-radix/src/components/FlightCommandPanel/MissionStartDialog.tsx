import { useState } from 'react';

import { Button, Dialog, Flex, Text } from '@radix-ui/themes';
import { Play } from 'lucide-react';

import { Surface } from '../Surface/Surface';

import type { MissionCurrent } from '@flightpath/flightpath/gen/ts/flightpath/mission_current_pb.js';

interface MissionStartDialogProps {
  missionCurrent: MissionCurrent | null;
  onMissionStart: () => void;
  trigger: React.ReactElement;
}

export function MissionStartDialog({
  missionCurrent,
  onMissionStart,
  trigger,
}: MissionStartDialogProps) {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    onMissionStart();
    setOpen(false);
  };

  const missionItemCount = missionCurrent?.total ?? 0;

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>{trigger}</Dialog.Trigger>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Confirm Mission Start</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          <Surface
            color="amber"
            style={{ padding: '12px', marginBottom: '16px' }}
          >
            <Text size="2" style={{ color: 'var(--amber-11)' }}>
              Confirm that the airspace is clear and the mission path is safe.
              The drone will begin its autonomous mission immediately upon
              confirmation.
            </Text>
          </Surface>
        </Dialog.Description>

        <Surface color="gray" style={{ padding: '12px', marginBottom: '16px' }}>
          <Flex direction="column" gap="3">
            <Flex align="center" justify="between">
              <Text size="2">Mission Items</Text>
              <Text size="5" weight="bold">
                {missionItemCount}
              </Text>
            </Flex>
            <Text size="1">
              The drone will execute all mission items in sequence
            </Text>
          </Flex>
        </Surface>

        <Flex gap="3" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Button variant="solid" color="blue" onClick={handleConfirm}>
            <Play size={16} />
            Start Mission
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
