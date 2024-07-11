import { headers } from 'next/headers'

export const metadata = {
  title: 'RSC Examples Gallery by Ed Spencer',
  description: 'A set of React Server Components examples by Ed Spencer',
}
import '@/styles/tailwind.css'

const prose = ['prose prose-slate'].join('')

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
