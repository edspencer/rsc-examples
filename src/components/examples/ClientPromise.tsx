'use client'
import { use } from 'react'

export default function ClientPromise({
  dataPromise,
}: {
  dataPromise: Promise<string>
}) {
  const data = use(dataPromise)

  if (typeof data === 'object') {
    return (
      <pre className="border border-red-600">
        {JSON.stringify(data, null, 2)}
      </pre>
    )
  }

  return <div className="border border-red-600">{data}</div>
}
