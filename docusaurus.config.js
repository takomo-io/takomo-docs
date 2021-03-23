module.exports = {
  title: 'Takomo',
  tagline: 'Organize, parameterize and deploy CloudFormation stacks',
  url: 'https://takomo.io',
  baseUrl: process.env.DOCS_BASE || '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'takomo-io',
  projectName: 'Takomo',
  plugins: [],
  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    googleAnalytics: {
      trackingID: 'UA-165592316-1',
    },
    navbar: {
      title: 'Takomo',
      hideOnScroll: true,
      logo: {
        alt: 'Takomo logo',
        src: 'img/takomo-logo-sm.png',
      },
      items: [
        {
          href: 'https://docs.takomo.io',
          label: 'Docs',
          position: 'left',
        },
        {
          href: 'https://takomo.io/api-docs/latest/',
          label: 'API',
          position: 'left',
        },
        {
          href: 'https://github.com/takomo-io/takomo',
          className: 'header-github-link',
          position: 'right',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Learn',
          items: [
            {
              label: 'Introduction',
              to: 'https://docs.takomo.io/',
            },
            {
              label: 'Installation',
              to: 'https://docs.takomo.io/getting-started/installation',
            }
          ],
        },
        {
          title: 'Development',
          items: [
            {
              label: 'GitHub',
              to: 'https://github.com/takomo-io/takomo',
            },
            {
              label: 'NPM',
              to: 'https://www.npmjs.com/package/takomo',
            },
          ],
        },
        {
          title: 'Support',
          items: [
            {
              label: 'Gitter',
              to: 'https://gitter.im/takomo-io/community',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Henri Meltaus`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
          sidebarCollapsible: false
        },
      },
    ],
  ],
};
