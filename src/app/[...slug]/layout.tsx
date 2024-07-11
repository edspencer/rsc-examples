import { type Metadata } from 'next'

import RootLayout from '@/components/RootLayout'

export const metadata: Metadata = {
  title: {
    template: '%s - RSC Examples',
    default: 'React Server Components Examples',
  },
  description:
    'An increasingly comprehensive set of examples on the various ways to use React Server Components',
}

export default RootLayout
