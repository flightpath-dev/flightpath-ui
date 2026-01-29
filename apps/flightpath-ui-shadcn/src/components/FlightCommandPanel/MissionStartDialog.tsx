import { useState } from 'react';

import { Button } from '@flightpath/autopilot/components/ButtonTemp';
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
import { Surface } from '@flightpath/autopilot/components/Surface';
import { Play } from 'lucide-react';

interface MissionStartDialogProps {
  missionItemCount: number;
  onMissionStart: () => void;
  trigger: React.ReactElement;
}

export function MissionStartDialog({
  missionItemCount,
  onMissionStart,
  trigger,
}: MissionStartDialogProps) {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    onMissionStart();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Trigger */}
      <DialogTrigger render={trigger} />

      {/* Content */}
      <DialogContent className="sm:max-w-[425px]">
        {/* Safety Warning */}
        <DialogHeader>
          <DialogTitle>Confirm Mission Start</DialogTitle>
          <DialogDescription>
            <Surface color="amber" className="p-3 mt-2">
              Confirm that the airspace is clear and the mission path is safe.
              The drone will begin its autonomous mission immediately upon
              confirmation.
            </Surface>
          </DialogDescription>
        </DialogHeader>

        {/* Mission Info */}
        <Surface color="neutral" className="flex flex-col gap-3 p-3 my-1">
          <div className="flex items-center justify-between">
            <span className="text-sm">Mission Items</span>
            <span className="text-foreground text-xl font-mono">
              {missionItemCount}
            </span>
          </div>
          <span>The drone will execute all mission items in sequence</span>
        </Surface>

        {/* Footer */}
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button onClick={handleConfirm}>
            <Play size="size-4" />
            Start Mission
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
