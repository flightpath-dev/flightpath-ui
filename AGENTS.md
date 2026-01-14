# Project Instructions

This project is the frontend for the Flightpath platform – a Ground Control
Station (GCS) to control a drone.

## Tech Stack & Reference Documentation

Here are the important references for documentation for our tech stack:

- [MAVLink Protocol](https://mavlink.io/en/): Used to control the drone.
-

## Code Style

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
import type { StatusIndicatorColor } from "../StatusIndicator/StatusIndicator";
import { StatusIndicator } from "../StatusIndicator/StatusIndicator";
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
