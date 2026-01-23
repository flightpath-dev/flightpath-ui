import type { Severity } from './Severity';

export enum FlightStateEnum {
  NotReady = 'notReady',
  ReadyToFly = 'readyToFly',
  Armed = 'armed',
  Flying = 'flying',
  Landing = 'landing',
  CommunicationLost = 'communicationLost',
}

export type FlightState = `${FlightStateEnum}`;

export interface FlightStatus {
  // The primary state indicator
  state: FlightState;

  // State severity
  severity: Severity;
}
