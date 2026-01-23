/**
 * Position data to display on a 2D map
 * Derived from GLOBAL_POSITION_INT (33)
 */
export interface Position2D {
  /**
   * Latitude
   * Unit: degrees
   * MAVLink: GLOBAL_POSITION_INT (33) -> lat
   * Unit: degrees * 1E7
   */
  lat: number;

  /**
   * Longitude
   * Unit: degrees
   * MAVLink: GLOBAL_POSITION_INT (33) -> lon
   * Unit: degrees * 1E7
   */
  lon: number;

  /**
   * Heading
   * Unit: degrees
   * MAVLink: GLOBAL_POSITION_INT (33) -> heading
   * Unit: degrees * 100
   */
  heading: number;
}
