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
import { Field, FieldLabel } from '@flightpath/autopilot/components/Field';
import { Input } from '@flightpath/autopilot/components/Input';

export function App() {
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Hello World</h1>

        <Dialog>
          <form>
            {/* Trigger */}
            <DialogTrigger render={<Button>Open Dialog</Button>} />

            {/* Content */}
            <DialogContent>
              {/* Header */}
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you&apos;re
                  done.
                </DialogDescription>
              </DialogHeader>

              {/* Fields */}
              <Field>
                <FieldLabel htmlFor="name-1">Name</FieldLabel>
                <Input id="name-1" defaultValue="Naresh Bhatia" />
              </Field>
              <Field>
                <FieldLabel htmlFor="username-1">Username</FieldLabel>
                <Input id="username-1" defaultValue="nareshbhatia" />
              </Field>

              {/* Footer */}
              <DialogFooter>
                <DialogClose
                  render={<Button variant="outline">Cancel</Button>}
                />
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
      </div>
    </div>
  );
}
