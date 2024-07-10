import { LoadingMessage } from '@/components/LoadingMessage'

import { Suspense } from 'react'
import Table from '@/components/examples/table'
import { getData } from './data'

export default function SuspensePage() {
  return (
    <>
      <p>This line rendered on the server.</p>
      <p>
        The table that appears below was rendered on the client, passed a
        dataPromise prop that contains its data.
      </p>

      <Suspense fallback={<LoadingMessage />}>
        <Table dataPromise={getData(1000)} />
      </Suspense>
    </>
  )
}
