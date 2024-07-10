'use client'
import { use } from 'react'

export default function ClientPortal({
  childrenPromise,
}: {
  childrenPromise: Promise<React.ReactNode>
}) {
  const children = use(childrenPromise)

  return <div className="border border-blue-600">{children}</div>
}
