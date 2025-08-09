import * as path from 'node:path';
import { defineConfig } from 'rspress/config';
import sitemap from "rspress-plugin-sitemap";

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  builderConfig: {
    resolve: {
      alias: {
        '@components': './components',
      },
    },
  },
  title: 'Takomo',
  logoText: 'Takomo v8.0.0',
  description: 'Organize, parameterize and deploy your CloudFormation stacks',
  icon: '/takomo-icon.png',
  logo: {
    light: '/takomo-light-logo.png',
    dark: '/takomo-dark-logo.png',
  },
  plugins: [
    sitemap({
      domain: "https://takomo.io"
    })
  ],
  themeConfig: {
    enableScrollToTop: true,
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/takomo-io/takomo',
      },
    ],
  },
});
