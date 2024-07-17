import { LoadingMessage } from '@/components/LoadingMessage'

import { Suspense } from 'react'
import Table from '@/components/examples/table'

async function getData(delay: number) {
  return new Promise((resolve, reject) => setTimeout(() => {
    //SUPER IMPORTANT: You must provide an Error to reject() or next.js will crash
    //see https://github.com/vercel/next.js/issues/67863
    reject(new Error('Data load failed'))
  }, delay))
}

export default function RejectedPromisePage() {
  return (
    <>
      <p>This page was rendered on the server.</p>
      <p>
        It wants to show a data table below, but the promise is rejected. The
        table component is wrapped in a Suspense component, which will show a
        loading message until the data is ready. In this case, the data will
        never be ready, so the loading message will stay on the screen
      </p>

      <Suspense fallback={<LoadingMessage />}>
        <Table dataPromise={getData(1000)} />
      </Suspense>
    </>
  )
}
