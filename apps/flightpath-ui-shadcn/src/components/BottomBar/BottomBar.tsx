import { FPSMeter } from '@flightpath/autopilot/components/FPSMeter';

export function BottomBar() {
  return (
    <div className="flex items-center justify-between h-18 px-8">
      <div>Telemetry Display</div>
      <FPSMeter />
    </div>
  );
}
