import { ModeToggle } from '@flightpath/autopilot/components/ModeToggle';

import { Logo } from './Logo';
import { Navigation } from './Navigation';
import { BatteryRemainingIndicator } from '../BatteryRemainingIndicator/BatteryRemainingIndicator';
import { RssiIndicator } from '../RssiIndicator/RssiIndicator';
import { SatelliteCountIndicator } from '../SatelliteCountIndicator/SatelliteCountIndicator';

export function TopBar() {
  return (
    <header className="grid grid-cols-[1fr_auto_1fr] h-14 px-4 border-b">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <Logo />
      </div>

      {/* Center Section - Mode Navigation */}
      <Navigation />

      {/* Right Section */}
      <div className="flex items-center gap-6 justify-end">
        <SatelliteCountIndicator />
        <RssiIndicator />
        <BatteryRemainingIndicator />
        <ModeToggle />
      </div>
    </header>
  );
}
