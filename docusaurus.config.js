const currentRelease = process.env.CURRENT_RELEASE || 'next'

module.exports = {
  title: 'Takomo',
  customFields: {
    currentRelease,
  },
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
    announcementBar: {
      id: 'release3',
      content:
          'Takomo 3.0.0 released. Take a look at <a href="/docs/upgrade-guide/from-2-to-3">upgrade guide</a>.',
      backgroundColor: '#fafbfc',
      textColor: '#091E42',
      isCloseable: true,
    },
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    googleAnalytics: {
      trackingID: 'UA-165592316-1',
    },
    algolia: {
      apiKey: '34a9b39ce6857682820980ace4f5fa1c',
      indexName: 'takomo'
    },
    navbar: {
      title: 'Takomo ' + currentRelease,
      hideOnScroll: true,
      logo: {
        alt: 'Takomo logo',
        src: 'img/takomo-logo-sm.png',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          href: `https://takomo.io/api-docs/release/${currentRelease.replace(/\./g, '-')}/`,
          label: 'API',
          position: 'left',
        },
        {
          to: 'versions/',
          label: 'All versions',
          position: 'right',
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
              to: 'docs',
            },
            {
              label: 'Installation',
              to: 'docs/getting-started/installation',
            },
            {
              label: 'Examples',
              to: 'docs/examples/about',
            },
          ],
        },
        {
          title: 'Docs',
          items: [
            {
              label: 'Stacks',
              to: 'docs/stacks/introduction',
            },
            {
              label: 'Deployment Targets',
              to: 'docs/deployment-targets/introduction',
            },
            {
              label: 'Organization',
              to: 'docs/organizations/introduction',
            },
            {
              label: 'Config Reference',
              to: 'docs/config-reference/project',
            },
            {
              label: 'CLI',
              to: 'docs/command-line-usage/overview',
            },
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
      copyright: `Copyright © ${new Date().getFullYear()} Henri Meltaus. Built with <a href='https://v2.docusaurus.io/'>Docusaurus</a>.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: 'docs',
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: {
          showReadingTime: false,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
          sidebarCollapsible: false
        },
      },
    ],
  ],
};
