import { useState } from 'react';

import { Button, Dialog, Flex, Text, TextField } from '@radix-ui/themes';
import { ArrowUp } from 'lucide-react';

import { Surface } from '../Surface/Surface';

interface TakeoffDialogProps {
  onTakeoff: (altitudeFt: number) => void;
  trigger: React.ReactElement;
}

export function TakeoffDialog({ onTakeoff, trigger }: TakeoffDialogProps) {
  const [open, setOpen] = useState(false);
  const [altitude, setAltitude] = useState('10');

  const handleConfirm = () => {
    const altitudeFt = parseFloat(altitude);
    if (!isNaN(altitudeFt) && altitudeFt > 0) {
      onTakeoff(altitudeFt);
      setOpen(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>{trigger}</Dialog.Trigger>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Confirm Takeoff</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          <Surface
            color="amber"
            style={{ padding: '12px', marginBottom: '16px' }}
          >
            <Text size="2" style={{ color: 'var(--amber-11)' }}>
              Confirm that the drone is outdoors with clear airspace above it.
              The drone will take off immediately upon confirmation.
            </Text>
          </Surface>
        </Dialog.Description>

        <Flex direction="column" gap="2" mb="4">
          <Text size="2" weight="medium">
            Takeoff Altitude (ft)
          </Text>
          <TextField.Root
            value={altitude}
            onChange={(e) => setAltitude(e.target.value)}
            type="number"
            min="0"
            step="0.1"
          />
          <Text size="1" color="gray">
            The drone will climb to this altitude and hold position
          </Text>
        </Flex>

        <Flex gap="3" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button variant="solid" color="blue" onClick={handleConfirm}>
              <ArrowUp size={16} />
              Confirm Takeoff
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
