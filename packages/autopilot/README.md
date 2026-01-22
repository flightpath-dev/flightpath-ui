# Autopilot

Design system for Flightpath, built with shadcn/ui and Tailwind CSS v4.

## Overview

`@flightpath/autopilot` is the design system for Flightpath applications. It
provides reusable React components built with shadcn/ui and styled with Tailwind
CSS v4. All Tailwind utility classes use the `ap:` prefix to avoid conflicts
with consuming applications.

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
import '@flightpath/autopilot/index.css';
```

### Import Components

You can import components in two ways:

**From main entry (tree-shakeable):**

```tsx
import { Button, Card } from '@flightpath/autopilot';
```

**Direct component import (maximum tree-shaking):**

```tsx
import { Button } from '@flightpath/autopilot/components/button';
import { Card } from '@flightpath/autopilot/components/card';
```

### Example Usage

```tsx
import { Button } from '@flightpath/autopilot/components/button';
// or
// import { Button } from '@flightpath/autopilot';

function App() {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  );
}
```

## Tree-Shaking Strategy

This package is designed to be fully tree-shakeable, meaning only the components
you import will be included in your final bundle.

### How It Works

1. **ESM Format**: The package uses ES modules (`"type": "module"`), which
   enables tree-shaking
2. **Side Effects Free**: The package is marked with `"sideEffects": false`,
   telling bundlers that the package has no side effects
3. **Individual Component Exports**: Each component can be imported directly
   from its own path
4. **Re-exports**: The main entry point uses re-exports (not imports), allowing
   unused exports to be eliminated

### Import Recommendations

For maximum tree-shaking, prefer direct component imports:

```tsx
// ✅ Best for tree-shaking
import Button from '@flightpath/autopilot/components/button';
```

The main entry is also tree-shakeable:

```tsx
// ✅ Also tree-shakeable
import { Button } from '@flightpath/autopilot';
```

### Verifying Tree-Shaking

To verify that tree-shaking is working:

1. Use a bundle analyzer tool (e.g., `vite-bundle-visualizer`,
   `webpack-bundle-analyzer`)
2. Check your bundle size when importing different numbers of components
3. Ensure unused components are not included in the final bundle

## Tailwind Prefix

All Tailwind utility classes in this package use the `ap:` prefix to avoid
conflicts with your application's own Tailwind configuration.

### How It Works

- Components automatically use prefixed classes (e.g., `ap:flex`,
  `ap:bg-primary`)
- CSS variables remain unprefixed and work seamlessly with the prefix system
- The prefix is configured in `src/index.css` using Tailwind v4's CSS-based
  configuration

### Example

When you use a component, it will automatically apply prefixed classes:

```tsx
<Button className="ap:flex ap:items-center">
  Button with prefixed classes
</Button>
```

## Development

### Adding New Components

Use the shadcn CLI to add new components:

```bash
cd packages/autopilot
npx shadcn@latest add button
```

Components will be added to `src/components/` and should be exported from
`src/index.ts`.

### Build Commands

```bash
# Build the package
pnpm build

# Type check
pnpm check-types

# Watch mode for development
pnpm dev

# Clean build artifacts
pnpm clean
```

### Type Checking

```bash
pnpm check-types
```

## Package Structure

```
packages/autopilot/
├── src/
│   ├── index.ts          # Main entry point (re-exports components)
│   ├── index.css         # Tailwind CSS configuration with ap: prefix
│   ├── lib/
│   │   └── utils.ts      # Utility functions (cn, etc.)
│   └── components/       # Component files (added via shadcn CLI)
├── dist/                 # Build output (generated)
├── package.json
├── tsconfig.json
├── vite.config.ts
└── components.json       # shadcn configuration
```

## Dependencies

### Peer Dependencies

- `react` ^19.2.3
- `react-dom` ^19.2.3

### Runtime Dependencies

- `@base-ui/react` - Base UI primitives
- `class-variance-authority` - Component variants
- `clsx` - Class name utility
- `tailwind-merge` - Tailwind class merging
- `lucide-react` - Icons

## License

Private - Internal use only
