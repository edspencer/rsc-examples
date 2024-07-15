export const navigation = [
  {
    title: 'Home',
    links: [
      {
        title: 'Introduction',
        href: '/',
      },
      {
        title: 'Examples Gallery',
        href: '/gallery',
      },
    ],
  },
  {
    title: 'Static Pages',
    links: [
      {
        title: 'All server-side components',
        href: '/static-pages/server-only',
      },
      {
        title: 'Server & Client components',
        href: '/static-pages/server-client',
      },
    ],
  },
  {
    title: 'Full Pages',
    links: [
      {
        title: 'async page, no suspense',
        href: '/pages/slow/no-suspense',
      },
      {
        title: 'page-level suspense',
        href: '/pages/slow/page-suspense',
      },
      {
        title: 'component-level suspense',
        href: '/pages/slow/component-suspense',
      },
      {
        title: 'async, no suspense',
        href: '/pages/fast/no-suspense',
      },
    ],
  },
  {
    title: 'Promises',
    links: [
      {
        title: 'Resolving promises',
        href: '/promises/resolved',
      },
      {
        title: 'Rendering Components',
        href: '/promises/rendering-components',
      },
      {
        title: 'Rejected promises',
        href: '/promises/rejected',
      },
      {
        title: 'Various data types',
        href: '/promises/various-datatypes',
      },
      // {
      //   title: 'With custom payload',
      //   href: '/promises/with-custom-payload',
      // },
    ],
  },
  {
    title: 'Handling Errors',
    links: [
      {
        title: 'No boundaries',
        href: '/errors/no-handling',
      },
      {
        title: 'Explicit Error Boundary',
        href: '/errors/error-boundary',
      },
      {
        title: 'Using error.tsx',
        href: '/errors/error-tsx',
      },
    ],
  },
  // {
  //   title: 'Forms',
  //   links: [
  //     {
  //       title: 'Basic',
  //       href: '/forms/basic',
  //     },
  //     {
  //       title: 'Validation',
  //       href: '/forms/validation',
  //     },
  //     {
  //       title: 'Submission',
  //       href: '/forms/submission',
  //     },
  //     {
  //       title: 'Submission with validation',
  //       href: '/forms/submission-with-validation',
  //     },
  //   ],
  // },
]
