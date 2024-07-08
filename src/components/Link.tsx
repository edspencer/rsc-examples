import { ReactNode } from 'react'

export function Link({
  href,
  children,
  ...props
}: {
  href: string
  children: ReactNode
  [key: string]: any
}) {
  console.log('Rdnering LINK, ', href)
  return (
    <a href={href} {...props}>
      {children}
    </a>
  )
}
