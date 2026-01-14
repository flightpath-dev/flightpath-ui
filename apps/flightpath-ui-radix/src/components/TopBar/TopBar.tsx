import { Grid, Flex } from '@radix-ui/themes';

import FlightPathLogo from '../../assets/flightpath-logo.png';
import { mainNavItems } from '../../config/main-nav';
import {
  useFlightMode,
  useFlightStatus,
  useSatellites,
  useRemoteRssi,
  useBatteryRemaining,
} from '../../providers/useServices';
import { BatteryRemainingIndicator } from '../BatteryRemainingIndicator/BatteryRemainingIndicator';
import { FlightModeIndicator } from '../FlightModeIndicator/FlightModeIndicator';
import { FlightStatusIndicator } from '../FlightStatusIndicator/FlightStatusIndicator';
import { ModeToggle } from '../ModeToggle/ModeToggle';
import { NavLink } from '../NavLink/NavLink';
import { RssiIndicator } from '../RssiIndicator/RssiIndicator';
import { SatelliteCountIndicator } from '../SatelliteCountIndicator/SatelliteCountIndicator';

import styles from './TopBar.module.css';

export function TopBar() {
  const flightMode = useFlightMode();
  const flightStatus = useFlightStatus();
  const satellites = useSatellites();
  const remoteRssi = useRemoteRssi();
  const batteryRemaining = useBatteryRemaining();

  return (
    <Grid
      className={styles.container}
      columns="1fr auto 1fr"
      height="56px"
      px="4"
    >
      {/* Left Section */}
      <Flex align="center" gap="4">
        <img
          alt="Flightpath Logo"
          height={36}
          src={FlightPathLogo}
          width={36}
        />
        <FlightStatusIndicator status={flightStatus} />
        <FlightModeIndicator mode={flightMode} />
      </Flex>

      {/* Center Section - Mode Navigation */}
      <Flex align="center" gap="2">
        {mainNavItems.map(({ title, icon, path }) => (
          <NavLink icon={icon} key={path} path={path} title={title} />
        ))}
      </Flex>

      {/* Right Section */}
      <Flex align="center" gap="5" justify="end">
        <SatelliteCountIndicator satellites={satellites} />
        <RssiIndicator rssi={remoteRssi} />
        <BatteryRemainingIndicator percentage={batteryRemaining} />
        <ModeToggle />
      </Flex>
    </Grid>
  );
}
