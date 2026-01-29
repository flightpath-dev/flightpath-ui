import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@flightpath/autopilot/components/Card';

export function GuideView() {
  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <Card className="w-full max-w-2xs">
        <CardHeader>
          <CardTitle>Guided Mode</CardTitle>
          <CardDescription>AI-powered autonomous flight</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}
