'use client'

import { startTransition, useState } from 'react'
import { useRouter } from 'next/navigation'

import Spinner from './Spinner'

export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error
  resetErrorBoundary: () => void
}) {
  const router = useRouter()

  //tracks the state of our reset button
  const [isResetting, setIsResetting] = useState(false)

  function retry() {
    setIsResetting(true)

    startTransition(() => {
      router.refresh()
      resetErrorBoundary()
      setIsResetting(false)
    })
  }

  return (
    <div className="border border-orange-700 p-4 text-orange-700">
      <p className="m-0 mb-2 p-0">There was an error loading this component</p>
      <button
        onClick={() => retry()}
        disabled={isResetting}
        className="button inline-flex items-center gap-4 rounded-md border bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        {isResetting ? <Spinner /> : null}
        Retry
      </button>
    </div>
  )
}
