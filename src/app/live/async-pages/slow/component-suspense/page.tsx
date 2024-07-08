import { Suspense } from 'react'
import Loading from '@/components/Loading'

async function slowDataLoad(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('This data took 3 seconds to load')
    }, 3000)
  })
}

export default async function Page() {
  return (
    <>
      <h1>RSC - async Page with Component-level Suspense</h1>
      <p>
        This paragraph was rendered instantly by the server. Underneath it is a
        Suspense component, which loads data that takes 3 seconds to fetch:
      </p>
      <Suspense fallback={<Loading />}>
        <DataComponent />
      </Suspense>
      <p>
        This example renders 2 async components - the Page component and the
        child DataComponent. The DataComponent loads data that takes 3 seconds
        to load, but because we wrapped it inside Suspense, the page-level
        component did not have anything else to wait around for (despite being
        declared `async`), so it rendered immediately.
      </p>
      <p>
        While the async Page component rendered, the Suspense fallback was shown
        for 3 seconds until DataComponent resolved its data, at which point the
        new content was streamed to the browser.
      </p>
    </>
  )
}

async function DataComponent() {
  const data = await slowDataLoad()

  return <p>{data}</p>
}
