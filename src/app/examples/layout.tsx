import { headers } from 'next/headers'

export const metadata = {
  title: 'RSC Examples Gallery by Ed Spencer',
  description: 'A set of React Server Components examples by Ed Spencer',
}
import '@/styles/tailwind.css'

const prose = [
  'prose prose-slate max-w-none dark:prose-invert dark:text-slate-400',
  // headings
  'prose-headings:scroll-mt-28 prose-headings:font-display prose-headings:font-normal lg:prose-headings:scroll-mt-[8.5rem]',
  // lead
  'prose-lead:text-slate-500 dark:prose-lead:text-slate-400',
  // links
  'prose-a:font-semibold dark:prose-a:text-sky-400',
  // link underline
  'prose-a:no-underline prose-a:shadow-[inset_0_-2px_0_0_var(--tw-prose-background,#fff),inset_0_calc(-1*(var(--tw-prose-underline-size,4px)+2px))_0_0_var(--tw-prose-underline,theme(colors.sky.300))] hover:prose-a:[--tw-prose-underline-size:6px] dark:[--tw-prose-background:theme(colors.slate.900)] dark:prose-a:shadow-[inset_0_calc(-1*var(--tw-prose-underline-size,2px))_0_0_var(--tw-prose-underline,theme(colors.sky.800))] dark:hover:prose-a:[--tw-prose-underline-size:6px]',
  // pre
  'prose-pre:rounded-xl prose-pre:bg-slate-900 prose-pre:shadow-lg dark:prose-pre:bg-slate-800/60 dark:prose-pre:shadow-none dark:prose-pre:ring-1 dark:prose-pre:ring-slate-300/10',
  // hr
  'dark:prose-hr:border-slate-800',
].join('')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  //we don't actually care about headers, this is just to get Next JS to treat all of our pages as
  //dynamic. Otherwise, when we create a production build all of our pages will be statically generated
  //and the demo won't show anything as it will all just load instantly as static HTML.
  const pageHeaders = headers()

  return (
    <html lang="en">
      <body className={`${prose} p-4`}>{children}</body>
    </html>
  )
}
