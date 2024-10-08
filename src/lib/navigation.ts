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
        title: 'Handled Rejected promises',
        href: '/promises/rejected-handled',
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
      {
        title: 'Retry page after error',
        href: '/errors/reset',
      },
      {
        title: 'Retry component after error',
        href: '/errors/reset-boundary',
      },
    ],
  },
  {
    title: 'Server Actions',
    links: [
      // {
      //   title: 'Action Triggering',
      //   href: '/server-actions/button-trigger',
      // },
      {
        title: 'Form Submission',
        href: '/server-actions/simple-form',
      },
      {
        title: 'Form Submission with status',
        href: '/server-actions/form-status',
      },
      {
        title: 'Form Validation',
        href: '/server-actions/form-zod-validation',
      },
    ],
  },
]
