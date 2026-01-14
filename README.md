# Flightpath UI

Frontend for the Flightpath platform – a Ground Control Station (GCS) to control
a drone.

![Screenshot](assets/screenshot.png)

## Architecture

![architecture](./assets/flightpath-ui-architecture.png)

## Prerequisites for development

1. Install [Node Version Manager](https://github.com/nvm-sh/nvm) (nvm). It
   allows using different versions of node via the command line
2. Run `nvm use` to use the required version of node.
3. Run `pnpm i` to install required packages.
4. Start a PX4 SITL by following the instructions in
   [PX4 SITL Setup](https://github.com/flightpath-dev/flightpath/blob/main/docs/px4-sitl-setup.md).
5. Run the Flightpath Server by following the instructions in the
   [Flightpath repository](https://github.com/flightpath-dev/flightpath)
   (`go run cmd/server/main.go`).

## Development Build

```shell
pnpm dev
```

Now point your browser to http://localhost:3000

## Production Build

```shell
cd apps/flightpath-ui-radix
pnpm build
pnpm preview
```

Now point your browser to http://localhost:3000

## All Commands

```
pnpm build            # builds prod bundles
pnpm clean            # deletes all build artifacts
pnpm dev              # run all dev builds
pnpm fix              # lints, formats and attempts to fix any issues (requires `pnpm build` has been ran)
pnpm lint             # runs the linter, useful for debugging lint issues (generally `pnpm fix` is preferred)
pnpm preview          # runs the prod build (go to the appropriate app directory first)
```

## Performance

| CPU           | gRPC Stream | FPS |
| ------------- | :---------: | :-: |
| No throttling |     ❌      | 60  |
| 4x slowdown   |     ❌      | 60  |
| 6x slowdown   |     ❌      | 60  |
| 20x slowdown  |     ❌      | 55  |
| No throttling |     ✅      | 60  |
| 4x slowdown   |     ✅      | 42  |
| 6x slowdown   |     ✅      | 24  |
| 20x slowdown  |     ✅      | 10  |
