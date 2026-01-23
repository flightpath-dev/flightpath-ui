/**
 * Telemetry data from the drone
 * Derived from MAVLink messages:
 * - GLOBAL_POSITION_INT (33)
 * - VFR_HUD (74) – Visual Flight Rules - Heads-Up Display
 */
export interface Telemetry {
  /**
   * Altitude above mean sea level
   * Unit: feet
   * MAVLink: GLOBAL_POSITION_INT (33) -> alt
   * Unit: mm
   */
  mslAltitude: number;

  /**
   * Altitude above home
   * Unit: feet
   * MAVLink: GLOBAL_POSITION_INT (33) -> relative_alt
   * Unit: mm
   */
  relativeAltitude: number;

  /**
   * Ground speed
   * Unit: mph
   * MAVLink: VFR_HUD (74) -> groundspeed
   * Unit: m/s
   */
  groundSpeed: number;

  /**
   * Climb rate
   * Unit: mph
   * MAVLink: VFR_HUD (74) -> climb
   * Unit: m/s
   */
  climb: number;

  /**
   * Heading
   * Unit: degrees
   * MAVLink: VFR_HUD (74) -> heading
   * Unit: degrees
   */
  heading: number;

  /**
   * Throttle
   * Unit: percent
   * MAVLink: VFR_HUD (74) -> throttle
   * Unit: percent
   */
  throttle: number;
}
