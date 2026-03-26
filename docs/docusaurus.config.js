// @ts-check
const {themes} = require('prism-react-renderer');
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'PHP Interview Questions',
  tagline: 'Ultimate Answer Repository',
  favicon: 'img/favicon.ico',

  url: 'http://jauhenis.com',
  baseUrl: '/',

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    }
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/JauheniS/php-interview-ultimate/edit/main/docs/',
          path: 'docs',
          routeBasePath: '/',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        sitemap: {
          changefreq: 'daily',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
      }),
    ],
  ],

  themes: ['docusaurus-theme-search-typesense'],

  plugins: [
    async function tailwindPlugin(_context, _options) {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          postcssOptions.plugins.push(require("tailwindcss"));
          postcssOptions.plugins.push(require("autoprefixer"));
          return postcssOptions;
        },
      };
    },
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'PHP Interview Questions',
        items: [
          {
            to: '/',
            position: 'left',
            label: 'Questions',
          },
          {
            to: '/answers',
            position: 'left',
            label: 'Answers',
          },
          {
            to: '/answers/php84_features',
            position: 'left',
            label: 'PHP 8.4 News',
          },
          {
            to: '/answers/php85_features',
            position: 'left',
            label: 'PHP 8.5 News',
          },
          {
            href: 'https://github.com/JauheniS/php-interview-ultimate',
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
                label: 'Introduction',
                to: '/',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/php',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} PHP Interview Questions Repository. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['php'],
      },
      typesense: {
        typesenseCollectionName: 'php-questions',
        typesenseServerConfig: {
          nodes: [
            {
              host: 'ds.jauhenis.com',
              port: 443,
              protocol: 'https',
            },
          ],
          apiKey: process.env.TYPESENSE_SEARCH_ONLY_API_KEY || 'SEARCH_ONLY_API_KEY',
        },
        typesenseSearchParameters: {},
        contextualSearch: true,
      },
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 5,
      },
    }),
};

module.exports = config;
