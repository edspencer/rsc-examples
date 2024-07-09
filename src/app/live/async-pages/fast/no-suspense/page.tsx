//this just simulates a database call or similar that takes 20 milliseconds seconds
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
        didn&apos;t even notice the delay.
      </p>
    </>
  )
}
