---
title: Fast-loading data, no suspense, async page component
slug: pages/fast/no-suspense
nextjs:
  metadata:
    title: Fast-loading data, no suspense, async page component
    description: If your data sources are always fast, this approach is simple and fast enough
---

This example shows us not using `<Suspense>` boundaries at all, nor a `loading.tsx` file. But we get away with it because we're loading from a fast (simulated) database that returns in 20ms.

```app/page.tsx
//this just simulates a database call or similar that takes 2 seconds
async function slowDataLoad(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('This data took 20 milliseconds to load')
    }, 20)
  })
}

//async, but we know the sole await resolves in ~20ms, so will still be performant
export default async function Page() {
  const data = await slowDataLoad()

  return (
    <>
      <h1>RSC - async Page with no Suspense</h1>
      <p>{data}</p>
      <p>
        Suspense was not used at all, but the data source was so fast that you
        didn't even notice the delay.
      </p>
    </>
  )
}
```

What this example shows is that when your fetches take ~20ms, `<Suspense>` doesn't make any difference to performance. It only takes about one frame in the looping video below to finish rendering everything.

There are some cases where it's reasonable to believe that you can fetch data in a few tens of milliseconds - by all means use async Pages there, but beware that if those fetch endpoints degrade in performance, your entire page will suffer.