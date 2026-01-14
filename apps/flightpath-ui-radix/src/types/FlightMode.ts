export enum FlightModeEnum {
  Unknown = 'unknown',
  Manual = 'manual',
  Altitude = 'altitude',
  Position = 'position',
  Guided = 'guided',
  Stabilized = 'stabilized',
  Acro = 'acro',
  Ready = 'ready',
  Takeoff = 'takeoff',
  Hold = 'hold',
  Mission = 'mission',
  Return = 'return',
  Land = 'land',
  FollowMe = 'followMe',
}

export type FlightMode = `${FlightModeEnum}`;
