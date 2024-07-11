import { Suspense } from 'react'
import ClientPortal from '@/components/examples/ClientPortal'

export default function SuspensePage() {
  return (
    <div>
      <p>
        This line rendered on the server. A little later, there's a Suspense
        boundary that will be filled with a server-rendered component delivered
        as a Promise.
      </p>

      <p>
        Under this line will appear a server-rendered component that took 2
        seconds to generate. This could be a complex chart or something, though
        here it's just some raw data
      </p>
      <Suspense fallback={<div>Loading...</div>}>
        <ClientPortal childrenPromise={renderHeavyComponent(2000)} />
      </Suspense>
    </div>
  )
}

function renderHeavyComponent(delay: number): Promise<React.ReactNode> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(<ServerChildComponent data={{ some: 'data' }} />)
    }, delay)
  })
}

function ServerChildComponent({ data }: { data: any }) {
  return (
    <div>
      <h3>This rendered on the server, inside a Suspense boundary</h3>
      <p>
        It could have been a big heavy data table or graph or something,
        otherwise why do this? Anyway here's the data:
      </p>
      {JSON.stringify(data)}
    </div>
  )
}
