// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const { version } = require('./package.json')
const baseUrl = process.env.BASE_URL ?? '/'


/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Takomo',
  tagline: 'Organize, parameterize and deploy your CloudFormation stacks',
  url: 'https://takomo.io',
  baseUrl,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'takomo-io',
  projectName: 'takomo',

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          //editUrl: 'https://github.com/facebook/docusaurus/edit/main/website/',
        },
        // blog: {
        //   showReadingTime: true,
          // Please change this to your repo.
          //editUrl:'https://github.com/facebook/docusaurus/edit/main/website/blog/',
        // },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        // gtag: {
        //   trackingID: '',
        //   anonymizeIP: true,
        // },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      announcementBar: {
        backgroundColor: '#106100',
        textColor: '#ffffff',
        content:
          'Documentation is being updated. You can find the old docs <a target="_blank" rel="noopener noreferrer" href="https://docs.takomo.io/">here</a>',
      },
      navbar: {
        title: `Takomo v${version}`,
        logo: {
          alt: 'Takomo logo',
          src: 'img/favicon-32x32.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Docs',
          },
          {
            href: 'https://docs.takomo.io',
            label: 'Old docs',
            position: 'right',
          },
          {
            href: 'https://github.com/takomo-io/takomo',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'What is Takomo?',
                to: '/docs/intro',
              },
              {
                label: 'Getting started',
                to: '/docs/getting-started/installation',
              },
              {
                label: 'Tutorial',
                to: '/docs/getting-started/tutorial',
              },
            ],
          },
          {
            title: 'Support',
            items: [
              {
                label: 'Gitter',
                href: 'https://gitter.im/takomo-io/community',
              },
              {
                label: 'Feature requests and bug reports',
                href: 'https://github.com/takomo-io/takomo/issues',
              },
              {
                label: 'Discussion',
                href: 'https://github.com/takomo-io/takomo/discussions',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/takomo-io/takomo',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Takomo.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
