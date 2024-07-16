import { ErrorBoundary } from 'react-error-boundary'
import { LoadingMessage } from '@/components/LoadingMessage'

import { Suspense } from 'react'
import Table from './table'

//just rejects after a specified delay
function getData(delay: number) {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      reject()
    }, delay),
  )
}

//passes a promise to a client component
export default function RejectedPromisePage() {
  const promiseThatWillReject = getData(1000)

  return (
    <>
      <p>This page was rendered on the server.</p>
      <p>The ErrorBoundary below should catch this, but it does not.</p>

      <ErrorBoundary fallback={<ErrorFallback />}>
        <Suspense fallback={<LoadingMessage />}>
          <Table dataPromise={promiseThatWillReject} />
        </Suspense>
      </ErrorBoundary>
    </>
  )
}

function ErrorFallback() {
  return (
    <div className="text-red-700">There was an error with this content</div>
  )
}
