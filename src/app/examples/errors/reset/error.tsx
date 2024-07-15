'use client'

import { startTransition, useState } from 'react'
import { useRouter } from 'next/navigation'

import Spinner from './Spinner'

export default function ErrorMessage({ reset }: { reset: () => void }) {
  const router = useRouter()

  //tracks the state of our reset button
  const [isResetting, setIsResetting] = useState(false)

  function retry() {
    setIsResetting(true)

    startTransition(() => {
      router.refresh()
      reset()
      setIsResetting(false)
    })
  }

  return (
    <div>
      <p className="text-orange-700">
        There was an error with this page, caught by error.tsx so we can show
        this custom message.
      </p>
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
