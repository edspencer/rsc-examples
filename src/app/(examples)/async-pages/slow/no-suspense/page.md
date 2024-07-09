---
title: Slow-loading data, no suspense, async page component
slug: async-pages/slow/no-suspense
nextjs:
  metadata:
    title: Slow-loading data, no suspense, async page component
    description: This is a slow way of doing things, but it works
---

This example shows how to slow-loading data calls can cause an asynchronous server Page component to delay interactivity.

First we create a function called `slowDataLoad`, which just simulates a database call that takes 2 seconds to resolve, returning a string. `slowDataLoad` is an async function, so while it is running the `async function Page` function, which renders the page, will block until the 2 second data load has completed.

```app/page.tsx
//this just simulates a database call or similar that takes 2 seconds
async function slowDataLoad(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('This data took 2 seconds to load')
    }, 2000)
  })
}

//this entire Page is blocked because of the await slowDataLoad()
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

## Try to avoid async/await in these situations

As you can see, this approach allows us to write async/await code, which is syntactically great, but it also lead to a worst-possible outcome for the user, who had to wait until all the data were fetched before the application would even show one pixel.

If you have data to load from sources that you have high confidence can be retrieved in the order of 10ms, using `async` in your Page definitions will not have a serious impact on performance, but anything that can take significantly longer than 10ms to fetch should be wrapped in a Suspense boundary approach so that UI can be shown to the user almost instantly.
