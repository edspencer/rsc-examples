async function slowDataLoad(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('This data took 3 seconds to load')
    }, 3000)
  })
}

export default async function Page() {
  const data = await slowDataLoad()

  return (
    <>
      <h1>RSC - async Page with Page-level Suspense</h1>
      <p>{data}</p>
      <p>
        This example used a Page-level Suspense boundary by simply defining a
        `loading.tsx` file
      </p>
    </>
  )
}
