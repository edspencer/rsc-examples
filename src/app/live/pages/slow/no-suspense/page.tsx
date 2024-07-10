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
