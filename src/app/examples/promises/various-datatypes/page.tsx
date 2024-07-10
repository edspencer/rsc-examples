import { Suspense } from 'react'
import ClientPromise from '@/components/examples/ClientPromise'
import ClientPortal from '@/components/examples/ClientPortal'

async function getData(value: any, delay: number): Promise<any> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(value)
    }, delay)
  })
}

export default function SuspensePage() {
  return (
    <div className="mx-4 my-4 flex flex-col gap-4">
      <p>This line rendered on the server. Below this, values will stream in</p>
      <p>Now here's a Promise that resolved to a string:</p>
      <SuspenseWrapper value={'some string'} delay={1000} />

      <p>Now here's a Promise that resolved to an integer:</p>
      <SuspenseWrapper value={12345} delay={2000} />

      <p>Now here's a Promise that resolved to a float:</p>
      <SuspenseWrapper value={123.45} delay={3000} />

      <p>Now here's a Promise that resolved to an object:</p>
      <SuspenseWrapper value={{ myKey: 'someValue' }} delay={4000} />

      <p>
        Now here's a Promise that resolved to an array (of acceptable elements):
      </p>
      <SuspenseWrapper
        value={['some string', 12345, 123.45, { myKey: 'someValue' }]}
        delay={5000}
      />

      <p>Server-rendered Component:</p>
      <Suspense fallback={<div>Loading...</div>}>
        <ClientPortal childrenPromise={renderHeavyComponent(6000)} />
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
  return <div>{JSON.stringify(data)}</div>
}

function SuspenseWrapper({ value, delay }: { value: any; delay: number }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClientPromise dataPromise={getData(value, delay)} />
    </Suspense>
  )
}
