import * as path from 'node:path';
import { defineConfig } from 'rspress/config';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'Takomo',
  description: 'Organize, parameterize and deploy your CloudFormation stacks',
  icon: '/takomo-icon.png',
  logo: {
    light: '/takomo-light-logo.png',
    dark: '/takomo-dark-logo.png',
  },
  themeConfig: {
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/takomo-io/takomo',
      },
    ],
  },
});
