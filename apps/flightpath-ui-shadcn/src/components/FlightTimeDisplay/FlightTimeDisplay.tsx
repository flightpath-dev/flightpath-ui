import { MetricDisplay } from '@flightpath/autopilot/components/MetricDisplay';

import { useFlightTime } from '../../providers/useServices';

export function FlightTimeDisplay() {
  const flightTime = useFlightTime();

  const formatFlightTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <MetricDisplay label="Flight Time" value={formatFlightTime(flightTime)} />
  );
}
