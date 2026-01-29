import { useEffect, useRef, useState } from 'react';

import { Button } from '@flightpath/autopilot/components/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@flightpath/autopilot/components/Dialog';
import {
  Field,
  FieldLabel,
  FieldDescription,
} from '@flightpath/autopilot/components/Field';
import { Input } from '@flightpath/autopilot/components/Input';
import { Surface } from '@flightpath/autopilot/components/Surface';
import { ArrowUp } from 'lucide-react';

const DEFAULT_TAKEOFF_ALTITUDE_FT = 10;

interface TakeoffDialogProps {
  onTakeoff: (altitudeFt: number) => void;
  trigger: React.ReactElement;
}

export function TakeoffDialog({ onTakeoff, trigger }: TakeoffDialogProps) {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.value = DEFAULT_TAKEOFF_ALTITUDE_FT.toString();
    }
  }, [open]);

  const handleConfirm = () => {
    const altitudeFt = parseFloat(inputRef.current?.value || '');
    if (!isNaN(altitudeFt) && altitudeFt > 0) {
      onTakeoff(altitudeFt);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Trigger */}
      <DialogTrigger render={trigger} />

      {/* Content */}
      <DialogContent className="sm:max-w-[425px]">
        {/* Safety Warning */}
        <DialogHeader>
          <DialogTitle>Confirm Takeoff</DialogTitle>
          <DialogDescription>
            <Surface color="amber" className="p-3 mt-2">
              Confirm that the drone is outdoors with clear airspace above it.
              The drone will take off immediately upon confirmation.
            </Surface>
          </DialogDescription>
        </DialogHeader>

        {/* Altitude Input */}
        <Field className="my-1">
          <FieldLabel htmlFor="altitude">Takeoff Altitude (ft)</FieldLabel>
          <Input
            ref={inputRef}
            id="altitude"
            defaultValue={DEFAULT_TAKEOFF_ALTITUDE_FT.toString()}
            onFocus={(e) => e.target.select()} // select the input value on focus
          />
          <FieldDescription>
            The drone will climb to this altitude and hold position
          </FieldDescription>
        </Field>

        {/* Footer */}
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button onClick={handleConfirm}>
            <ArrowUp className="size-4" />
            Confirm Takeoff
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
