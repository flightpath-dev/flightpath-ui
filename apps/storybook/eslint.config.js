import { globalIgnores } from 'eslint/config';

import baseConfig from '@repo/eslint-config/vite';

export default [...baseConfig, globalIgnores(['storybook-static'])];
