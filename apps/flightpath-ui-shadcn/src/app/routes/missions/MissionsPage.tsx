import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@flightpath/autopilot/components/Card';

export function MissionsPage() {
  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <Card className="w-full max-w-2xs">
        <CardHeader>
          <CardTitle>Mission Planner</CardTitle>
          <CardDescription>Manage missions for your drone</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}
