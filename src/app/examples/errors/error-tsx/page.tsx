export default function PageWithErrorTSXFallback() {
  return (
    <>
      <p>
        This page demonstrates what happens when an error is thrown in a
        component with no error handling of its own, but with an `error.tsx`
        present either in the same directory or in a parent directory.
      </p>

      <ErrorComponent />

      <p>None of this content will show up.</p>
    </>
  )
}

function ErrorComponent() {
  throw new Error('Error thrown in component')

  return 'This will never be rendered'
}
