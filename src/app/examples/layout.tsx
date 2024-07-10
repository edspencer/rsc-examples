export const metadata = {
  title: 'RSC Examples Gallery by Ed Spencer',
  description: 'A set of React Server Components examples by Ed Spencer',
}
import '@/styles/tailwind.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
