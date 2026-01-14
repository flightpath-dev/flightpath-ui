/**
 * Telemetry data from the drone
 * Derived from MAVLink messages:
 * - HEARTBEAT (0)
 * - GLOBAL_POSITION_INT (33)
 * - VFR_HUD (74) – Visual Flight Rules - Heads-Up Display
 */
export interface Telemetry {
  /**
   * Flight time
   * Unit: seconds
   * MAVLink: HEARTBEAT (0) -> base_mode & 0x80 (safety_armed)
   * Calculation: time since safety_armed became true
   */
  flightTime: number;

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
