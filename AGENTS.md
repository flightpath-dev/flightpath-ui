# Project Instructions

This project is the ground control station for [Flightpath](https://github.com/flightpath-dev/flightpath). It uses gRPC to send MAVLink commands to the Flightpath server and receive MAVLink messages from the server.

## Reference Documentation

- [MAVLink Protocol Specification](https://mavlink.io/en/): Used to control the drone.
- [MAVLINK Common Message Set](https://mavlink.io/en/messages/common.html): Part of the above specification that contains a set of common messages and commands that should be implemented by MAVLink-compatible systems.
- [MAVLINK Common Message Set in XML format](https://github.com/mavlink/mavlink/blob/master/message_definitions/v1.0/common.xml): The common message set in a structured XML format. This is easier for programmatic understanding. Note that this set includes [standard.xml](https://github.com/mavlink/mavlink/blob/master/message_definitions/v1.0/standard.xml), which itself includes [minimal.xml](https://github.com/mavlink/mavlink/blob/master/message_definitions/v1.0/minimal.xml). For a full understanding of the protocol, it's important to understand all three.
- [PX4 implementation of MAVLink Specs](https://docs.px4.io/main/en/mavlink/standard_modes): This page from the PX4 Guide describes how PX4 implements the MAVLink protocol. Specifically look at [Other MAVLink Mode-changing Commands](https://docs.px4.io/main/en/mavlink/standard_modes#other-mavlink-mode-changing-commands) for a list of specific commands to change modes. These can be more convenient that just starting the mode, in particular when the message allows additional settings to be configured.
- [gomavlib](https://github.com/bluenviron/gomavlib): The Go library used by the Flightpath server to send MAVLink commands to the drone and receive MAVLink messages. Use these docs to understand the server capabilities. Especially, look at the [examples](https://github.com/bluenviron/gomavlib/tree/main/examples) directory to understand MAVLink workflows to achieve specific goals.

## Coding Style

- Use TypeScript for all new files

### Coding Style for imports

Don't mix type imports with regular imports, separate them out.

Example:

```ts
// DON'T DO THIS
import {
  StatusIndicator,
  type StatusIndicatorColor,
} from "../StatusIndicator/StatusIndicator";

// DO THIS INSTEAD
import { StatusIndicator } from "../StatusIndicator/StatusIndicator";

import type { StatusIndicatorColor } from "../StatusIndicator/StatusIndicator";
```

### Coding Style for Enumerations

When creating enumerations in TypeScript, follow these rules:

1. **Enum naming**: Use the `Enum` suffix for the enum name (e.g., `IntentEnum`,
   `StatusEnum`)
2. **Enum keys**: Use PascalCase string literals as enum keys
3. **Enum values**: Use camelCase string literals as enum values
4. **Type alias**: Create a type alias using template literal types to extract
   the enum values
5. **Export both**: Export both the enum and the type alias
6. **Prefer type alias**: Prefer the use of type alias over the enum. The enum
   should primarily used for iteration only.

This pattern allows you to:

- Use the enum for type-safe comparisons: `if (value === IntentEnum.Neutral)`
- Use the type alias for function parameters and return types:
  `function getIntent(): Intent`
- Get autocomplete and type checking for all enum values

Example:

```ts
export enum SeverityEnum {
  Info = "info",
  Success = "success",
  Warning = "warning",
  Error = "error",
}

export type Severity = `${SeverityEnum}`;
```
