import { Grid, Flex } from '@radix-ui/themes';

import FlightPathLogo from '../../assets/flightpath-logo.png';
import { mainNavItems, RoutePathEnum } from '../../config/RouteConfig';
import { BatteryRemainingIndicator } from '../BatteryRemainingIndicator/BatteryRemainingIndicator';
import { FlightModeIndicator } from '../FlightModeIndicator/FlightModeIndicator';
import { FlightStatusIndicator } from '../FlightStatusIndicator/FlightStatusIndicator';
import { ModeToggle } from '../ModeToggle/ModeToggle';
import { NavLink } from '../NavLink/NavLink';
import { RssiIndicator } from '../RssiIndicator/RssiIndicator';
import { SatelliteCountIndicator } from '../SatelliteCountIndicator/SatelliteCountIndicator';

import styles from './TopBar.module.css';

export function TopBar() {
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
        <FlightStatusIndicator />
        <FlightModeIndicator />
      </Flex>

      {/* Center Section - Mode Navigation */}
      <Flex align="center" gap="2">
        {Object.values(RoutePathEnum).map((routePath) => {
          const navItem = mainNavItems.get(routePath)!;
          return (
            <NavLink
              icon={navItem.icon}
              key={navItem.path}
              path={navItem.path}
              title={navItem.title}
            />
          );
        })}
      </Flex>

      {/* Right Section */}
      <Flex align="center" gap="5" justify="end">
        <SatelliteCountIndicator />
        <RssiIndicator />
        <BatteryRemainingIndicator />
        <ModeToggle />
      </Flex>
    </Grid>
  );
}
