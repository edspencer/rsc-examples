export default function ResettablePage() {
  return (
    <>
      <p>
        This page has a 50% chance of throwing an error. If it does, a Reset
        button will appear that you can click to reset the page.
      </p>
      <p>
        This is useful for when you want to give the user a way to recover from
        an error without having to refresh the entire page. Refresh the page a
        few times if you don't get the error immediately.
      </p>
      <ErrorComponent />
    </>
  )
}

async function ErrorComponent() {
  // Simulate a delay so we can see the Reset button spinning
  await new Promise((resolve) => setTimeout(resolve, 1000))

  if (Math.random() > 0.5) {
    throw new Error('Error thrown in component')
  }

  return (
    <p className="border border-blue-700 p-4">
      This has a 50% chance of throwing an error
    </p>
  )
}
