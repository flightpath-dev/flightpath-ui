import { FPSMeter } from '@flightpath/autopilot/components/FPSMeter';

import { BatteryRemainingIndicator } from '../../../../components/BatteryRemainingIndicator/BatteryRemainingIndicator';
import { FlightModeIndicator } from '../../../../components/FlightModeIndicator/FlightModeIndicator';
import { FlightTimeDisplay } from '../../../../components/FlightTimeDisplay/FlightTimeDisplay';
import { SatelliteCountIndicator } from '../../../../components/SatelliteCountIndicator/SatelliteCountIndicator';
import { SignalStrengthIndicator } from '../../../../components/SignalStrengthIndicator/SignalStrengthIndicator';
import { TelemetryDisplay } from '../../../../components/TelemetryDisplay/TelemetryDisplay';

export function Footer() {
  return (
    <footer className="bg-card/90 backdrop-blur-md border-t border-border">
      <div className="flex items-stretch justify-between py-3">
        {/* Left Side: Flight Time and Telemetry */}
        <div className="flex items-stretch divide-x divide-border">
          <FlightTimeDisplay padding="pl-6 pr-4" />
          <TelemetryDisplay padding="px-4" />
        </div>

        {/* Right Side: Secondary Indicators */}
        <div className="flex items-stretch divide-x divide-border">
          <FlightModeIndicator padding="px-4" />
          <SatelliteCountIndicator padding="px-4" />
          <SignalStrengthIndicator padding="px-4" />
          <BatteryRemainingIndicator padding="px-4" />
          <FPSMeter padding="pl-4 pr-6" />
        </div>
      </div>
    </footer>
  );
}
