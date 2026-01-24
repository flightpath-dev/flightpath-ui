# Autopilot

Design system for Flightpath, built with shadcn/ui and Tailwind CSS v4.

## Overview

`@flightpath/autopilot` is the design system for Flightpath applications. It
provides reusable React components built with shadcn/ui and styled with Tailwind
CSS v4.

## Installation

Add `@flightpath/autopilot` to the dependencies section of your consuming
application's `package.json`:

```json
{
  "dependencies": {
    "@flightpath/autopilot": "workspace:*"
  }
}
```

## Usage

### Import CSS

First, import the CSS file in your application's entry point:

```tsx
// main.tsx
import '@flightpath/autopilot/globals.css';
```

### Import Components

Import components directly from their component paths:

```tsx
import { Button } from '@flightpath/autopilot/components/button';
import { Card } from '@flightpath/autopilot/components/card';
```

### Example Usage

```tsx
import { Button } from '@flightpath/autopilot/components/button';

function App() {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  );
}
```

## Development

### Adding New Components

Use the shadcn CLI to add new components:

```bash
cd packages/autopilot
npx shadcn@latest add button
```

Components will be added to `src/components/`.

## Package Structure

```
packages/autopilot/
├── src/
│   ├── styles/
│   │   └── globals.css   # Tailwind CSS configuration
│   ├── lib/
│   │   └── utils.ts      # Utility functions (cn, etc.)
│   └── components/       # Component files (added via shadcn CLI)
├── package.json
├── tsconfig.json
├── vite.config.ts
└── components.json       # shadcn configuration
```
