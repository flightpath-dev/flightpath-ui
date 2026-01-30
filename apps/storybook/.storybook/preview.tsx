import type { Preview } from '@storybook/react-vite';
import '@flightpath/autopilot/globals.css';
import { themes } from 'storybook/theming';

// Apply class 'dark' to the <html> element of the preview iframe (the “canvas”).
// This triggers tailwind to go into dark mode.
if (typeof document !== 'undefined') {
  document.documentElement.classList.add('dark');
}

const preview: Preview = {
  parameters: {
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    docs: {
      // Set the theme for Storybook's docs
      // This needs to be done independently of the main UI, which is done in manager.ts
      // See https://storybook.js.org/docs/configure/user-interface/theming
      theme: themes.dark,
    },
  },
};

export default preview;
