import * as React from 'react';

import {
  Title,
  Subtitle,
  Description,
  Primary,
  Controls,
  Stories,
} from '@storybook/addon-docs/blocks';
import { withThemeByClassName } from '@storybook/addon-themes';
import { themes } from 'storybook/theming';

import type { Preview } from '@storybook/react-vite';

import '../src/index.css';

const preview: Preview = {
  decorators: [
    withThemeByClassName({
      themes: {
        light: '',
        dark: 'dark',
      },
      defaultTheme: 'dark',
    }),
  ],

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
      canvas: {
        // Hide the source panel and the "Show/Hide Code" button
        // See https://storybook.js.org/docs/api/doc-blocks/doc-block-canvas#sourcestate
        sourceState: 'none',
      },
      // The docs page renders a collection of stories at the end (see below)
      // 1. Don't include the primary (default) story in that collection
      // 2. Don't render a title before that collection (by default, it renders "Stories")
      // See https://storybook.js.org/docs/api/doc-blocks/doc-block-stories
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <Controls />
          <Stories includePrimary={false} title="" />
        </>
      ),
      // Set the theme for Storybook's docs
      // This needs to be done independently of the main UI, which is done in manager.ts
      // See https://storybook.js.org/docs/configure/user-interface/theming
      theme: themes.dark,
    },

    options: {
      storySort: {
        method: 'alphabetical',
        order: ['Overview', ['Colors'], 'Components'],
      },
    },
  },

  // Enable auto-generated documentation for all stories
  tags: ['autodocs'],
};

export default preview;
