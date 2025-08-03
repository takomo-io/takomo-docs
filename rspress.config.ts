import * as path from 'node:path';
import { defineConfig } from 'rspress/config';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'Takomo',
  description: 'Organize, parameterize and deploy your CloudFormation stacks',
  icon: '/rspress-icon.png',
  logo: {
    light: '/rspress-light-logo.png',
    dark: '/rspress-dark-logo.png',
  },
  themeConfig: {
    footer: {
      message:
        '<p>This is a footer with a <a href="https://example.com">link</a> and <strong>bold text</strong></p>',
    },
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/takomo-io/takomo',
      },
    ],
  },
});
