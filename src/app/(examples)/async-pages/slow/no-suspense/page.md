---
title: Slow-loading data, no suspense, async page component
slug: async-pages/slow/no-suspense
nextjs:
  metadata:
    title: Slow-loading data, no suspense, async page component
    description: This is a slow way of doing things, but it works
---

This example shows how to slow-loading data calls can cause an asynchronous server Page component to delay interactivity.

```jsx
//this just simulates a database call or similar that takes 2 seconds
async function slowDataLoad(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('This data took 2 seconds to load')
    }, 2000)
  })
}

export default async function Page() {
  const data = await slowDataLoad()

  return (
    <>
      <h1>RSC - async Page with no Suspense</h1>
      <p>{data}</p>
      <p>
        Suspense was not used at all, so you had to wait 2 seconds to see even a
        single pixel rendered in this example.
      </p>
    </>
  )
}

```

See [Live Page](/live/async-pages/slow/no-suspense)
