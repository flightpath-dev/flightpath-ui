import { addons } from 'storybook/manager-api';
import { themes } from 'storybook/theming';

addons.setConfig({
  // Set the theme for Storybook's main UI
  // This needs to be done independently of the docs, which is done in preview.tsx
  // See https://storybook.js.org/docs/configure/user-interface/theming
  theme: themes.dark,
});
